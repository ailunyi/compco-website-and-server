import pymongo
from fastapi import FastAPI, Depends, Request, Form, status, File, UploadFile
from fastapi.responses import FileResponse, StreamingResponse, Response, HTMLResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from pymongo import MongoClient
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
import json
from starlette.responses import RedirectResponse
from starlette.templating import Jinja2Templates    
import pandas
import bcrypt
from pydantic import BaseModel
from dataclasses import dataclass
from pathlib import Path
from typing import List, Tuple, Union
from PIL import Image, ImageSequence
import base64
import numpy as np
import io
from verify_email import verify_email
import nest_asyncio, asyncio
from fastapi.responses import RedirectResponse
from fastapi.exceptions import HTTPException
from fastapi import WebSocket, WebSocketDisconnect

from database import  *
import cropper 


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="pages")
    

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SESSIONIDModel(BaseModel):
    SESSIONID: str

from dataclasses import dataclass

past10Messages = []

@dataclass
class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: dict = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        id1 = str(uuid.uuid4())
        self.active_connections[id1] = websocket
        print("user connected")
        await self.broadcast(json.dumps({"type": "connect", "id": id1,"users":len(self.active_connections.values())}))
        for message in past10Messages:
            await self.send_message_to(websocket,message)

    def disconnect(self, websocket: WebSocket):
        id1 = self.find_connection_id(websocket)
        del self.active_connections[id1]
        return id1

    def find_connection_id(self, websocket: WebSocket):
        val_list = list(self.active_connections.values())
        key_list = list(self.active_connections.keys())
        id1 = val_list.index(websocket)
        return key_list[id1]

    async def send_message_to(self, ws: WebSocket, message: str):
        await ws.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            try:
                await connection.send_text(message)
            except:
                print("error sending")


connection_manager = ConnectionManager()

chatters = 0
@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
  await connection_manager.connect(websocket)
  try:
    while True:
        data = await websocket.receive_text()   
        print(f"Received data {data}")
        parsed = json.loads(data);
        if (parsed["type"] == "message"):
            past10Messages.append(data)
            if len(past10Messages) > 10:
                past10Messages.pop(0)
        
        await connection_manager.broadcast(data)
  except WebSocketDisconnect:
        # Remove the connection from the list of active connections
        id1 = connection_manager.disconnect(websocket)
        # Broadcast the disconnection of client with id to all the clients
        await connection_manager.broadcast(json.dumps({"type": "disconnected", "id": id1}))





@app.get("/")
def home(request: Request):
    #todos = db.query(models.Todo).all()
    return templates.TemplateResponse("index.html",
                                      {"request": request})


@app.get("/adminPanel/{sessionID}", response_class=HTMLResponse)  
async def admin(request: Request,sessionID):
    user = getUserBySession(sessionID)
    if (user == None):
        raise HTTPException(status_code=404, detail="Page not found")
        
    if (user["admin"]):
        return templates.TemplateResponse("/admin/index.html",{"request": request})
    else:
        raise HTTPException(status_code=404, detail="nice try " + user["firstName"])
    
@app.get("/competitions/search/{competition_query}")
async def getCompetitions(competition_query):
    comps = getCompetitionsWithName(competition_query)
    return comps


@app.get("/competitions/page/{competition_query}")
async def getCompetitionInfo(competition_query):
    comp = getCompetitionWithUrl(competition_query,True)
    return comp


@app.post("/competitions/comment")
async def addComment(content: str = Form()):
    content = json.loads(content)
    user = getUserBySession(content["sessionID"])
    if not user==None:
        addActivityComment(user["USERID"], user["username"], user["profilePicture"], content["competitionUrl"],content["message"]);
        return "ok"
    return "user not found"


@app.post("/competitions/like")
async def toggleLike(content: str = Form()):
    content = json.loads(content)
    user = getUserBySession(content["sessionID"])
    if not user==None:
        return toggleActivityLike(user["USERID"], content["competitionUrl"], content["change"]);
    return False

@app.get("/competitions/comments/{competition_query}")
async def getCompetitionComments(competition_query):
    comments = getActivityComments(competition_query)
    return comments



@app.get("/admin/pendingComptitions")
async def getPendingCompsInfo():
    comps = getPendingCompetitions()
    return comps

@app.get("/explore/trendingComptitions/{category}")
async def getTrendingCompsInfo(category):
    comps = getTrendingCompetitions(category)
    return comps

@app.get("/explore/newestComptitions/{category}")
async def getNewestCompsInfo(category):
    comps = getNewestCompetitions(category)
    return comps

@app.get("/explore/trendingSubcategory/{category}/sub/{subcategory}")
async def getTrendingSubInfo(category,subcategory):
    comps = getTrendingSubcategory(category,subcategory)
    return comps

@app.get("/getUser/{name}")
async def getUsersInfo(name):
    users = getUser(name)
    return users


@app.get("/getUserMadeComps/{id}")
async def getUsersMadeInfo(id):
    comps = getUserMadeComps(id)
    return comps

@app.get("/explore/newUsers")
async def getNewUsersInfo():
    users = getNewUsers()
    return users

class LoginInfo(BaseModel):
    email: str
    password: str

class RegisterInfo(BaseModel):
    firstName: str
    lastName: str
    username: str
    password: str
    email: str
    
class CompetitionInfo(BaseModel):
    name: str
    region: str
    location: str
    description: str
    prize: str
    preview: str
    creator: str
    category1: str
    category2: str
    date: str
    time: str
    images: str

@app.post("/cropGif")
async def cropGif(file: UploadFile = File(...), content: str = Form()):
    try:
        cropInfo = json.loads(content)
        print(cropInfo)
        gif = Image.open(io.BytesIO(file.file.read()))
        img = cropper.MultiFrameImage(gif)
        croppedImage = img.crop((int(cropInfo["left"]), int(cropInfo["upper"]), int(cropInfo["right"]), int(cropInfo["lower"])))
        buffered = io.BytesIO()
        croppedImage.save(buffered, format="GIF",  loop=0, save_all=True, duration= gif.info['duration'])


        print("cropped image successfully: " + file.filename)
        return Response(content=buffered.getvalue(), media_type='image/gif')
    except:
        print("cropping error")
        return "error"


@app.post("/createCompetition")
async def create_upload_file(files: List[UploadFile] = File(...), content: str = Form()):
    compInfo = json.loads(content)
    #name: name, location: location, description: description, prize: prize,
    #creator: sessionId, category1: chosenCategory1, category2: chosenCategory2, date: date, time: time
    #print(compInfo["details"]["croppedDetails"])
    addCompetition(compInfo["details"],files)
    return len(files)

@app.post("/editUserProfile")
async def editUser(content: str = Form()):
    userInfo = json.loads(content)["details"]
    editUserProfile(userInfo)
    return "ok"

@app.post("/login")
async def request(loginInfo: LoginInfo):
    return loginUser(loginInfo.email, loginInfo.password)

                


@app.post("/userInfo") 
async def request(sessionID: SESSIONIDModel):
   # need to add validation 
   user = getUserBySession(sessionID.SESSIONID)
   return dumps(user)

@app.post("/logout") 
async def logout(sessionID: SESSIONIDModel):
    # need to add validation 
    removeSession(sessionID.SESSIONID)
    return "done"

class CompetitionUrl(BaseModel):
    url: str
    official: bool

@app.post("/admin/approveCompetition") 
async def approveComp(competitionUrl: CompetitionUrl):
    # need to add validation 
    approveCompetition(competitionUrl.url, competitionUrl.official)
    return "done"

@app.post("/admin/rejectCompetition") 
async def rejectComp(competitionUrl: CompetitionUrl):
    # need to add validation 
    rejectCompetition(competitionUrl.url)
    return "done"   

nest_asyncio.apply() # async verify email
minUsernameLength = 3;
minPasswordLength = 3;
maxUsernameLength = 10;
invalidCharacters = ['/',',','"',"'"," ","\\",'#','%','&','{','}','$','!',':','@','<','>','*','?','+','`','|','=']
dontStartCharacters = ['.','-','_']
@app.post("/register")
async def register(registerInfo: RegisterInfo):
    if (len(registerInfo.firstName) == 0 and len(registerInfo.lastName) == 0):
        registerInfo.firstName = "compco"
        registerInfo.lastName = "user"
    if (len(registerInfo.username) <minUsernameLength or len(registerInfo.username) > maxUsernameLength or len(registerInfo.password) <minPasswordLength
        or any(ext in registerInfo.username for ext in invalidCharacters) or registerInfo.username[0] in dontStartCharacters):
            return {"message":"invalid username, password, or name", "login": 0}
    else:
        userRegisterInfo = addUser(registerInfo.firstName,registerInfo.lastName,registerInfo.username, registerInfo.email, registerInfo.password)
        print(userRegisterInfo)
        if (userRegisterInfo == -1):
            return {"message":"username taken", "login": 1}
        elif (userRegisterInfo == -2):
            return {"message":"email taken", "login": 3}
        elif (userRegisterInfo != None):
            return userRegisterInfo

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

    
#SERVER SSL
#if __name__ == "__main__":
#    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, ssl_keyfile='/etc/letsencrypt/live/compco.cc/privkey.pem', ssl_certfile='/etc/letsencrypt/live/compco.cc/fullchain.pem',loop='asyncio')