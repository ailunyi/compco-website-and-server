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
import nest_asyncio

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


@app.get("/")
def home(request: Request):
    #todos = db.query(models.Todo).all()
    return templates.TemplateResponse("index.html",
                                      {"request": request})


@app.get("/admin/", response_class=HTMLResponse)  
async def admin(request: Request):
    #todos = db.query(models.Todo).all()
    return templates.TemplateResponse("/admin/index.html",
                                      {"request": request})
    
@app.get("/competitions/search/{competition_query}")
async def getCompetitions(competition_query):
    comps = getCompetitionsWithName(competition_query)
    return comps


@app.get("/competitions/page/{competition_query}")
async def getCompetitionInfo(competition_query):
    comp = getCompetitionWithUrl(competition_query,True)
    return comp





@app.get("/admin/pendingComptitions")
async def getPendingCompsInfo():
    comps = getPendingCompetitions()
    return comps

@app.get("/explore/trendingComptitions/{category}")
async def getTrendingCompsInfo(category):
    comps = getTrendingCompetitions(category)
    return comps


@app.get("/explore/newUsers")
async def getNewUsersInfo():
    users = getNewUsers()
    return users

class LoginInfo(BaseModel):
    username: str
    password: str

class RegisterInfo(BaseModel):
    firstName: str
    lastName: str
    username: str
    password: str
    email: str
    
class CompetitionInfo(BaseModel):
    name: str
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
    #print(compInfo["name"])
    #name: name, location: location, description: description, prize: prize,
    # creator: sessionId, category1: chosenCategory1, category2: chosenCategory2, date: date, time: time
    addCompetition(compInfo["name"],compInfo["location"],  compInfo["description"], compInfo["prize"], compInfo["category1"],compInfo["category2"],compInfo["date"],compInfo["time"], files, compInfo["sessionId"], compInfo["contact"])
    return len(files)

@app.post("/login")
async def request(loginInfo: LoginInfo):
    return loginUser(loginInfo.username, loginInfo.password)

                


#@app.post("/userInfo") 
#async def request(sessionID: SESSIONIDModel):
#    # need to add validation 
#    getSessionInfo(sessionID)
#    #results = addCompetition(competitionInfo.name,competitionInfo.location, competitionInfo.description, competitionInfo.prize, competitionInfo.preview, competitionInfo.url, competitionInfo.creator)
#    return "done"

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
@app.post("/register")
async def register(registerInfo: RegisterInfo):
    if not verify_email(registerInfo.email):
        return {"message":"invalid email", "login": 4}
    elif (len(registerInfo.username) <minUsernameLength or len(registerInfo.password) <minPasswordLength or len(registerInfo.firstName) < 1 or len(registerInfo.lastName)<1):
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
#    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, ssl_keyfile='/etc/letsencrypt/live/compco.cc/privkey.pem', ssl_certfile='/etc/letsencrypt/live/compco.cc/fullchain.pem')