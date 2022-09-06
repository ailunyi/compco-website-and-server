import pymongo
from fastapi import FastAPI, Depends, Request, Form, status
from fastapi.staticfiles import StaticFiles
import uvicorn
from pymongo import MongoClient
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
import json
from starlette.responses import RedirectResponse
from starlette.templating import Jinja2Templates    
import pandas
from pydantic import BaseModel

from database import getUser, addUser, getCompetitionsWithName

#async def app(scope, receive, send):
#    assert scope['type'] == 'http'

#    await send({
#        'type': 'http.response.start',
#        'status': 200,
#        'headers': [
#            [b'content-type', b'text/plain'],
#        ],
#    })
#    await send({
#        'type': 'http.response.body',
#        'body': b'Hello, world!',
#    })


app = FastAPI()
templates = Jinja2Templates(directory="website")


origins = ["http://localhost:8000", "http://localhost:8000/login", "http://127.0.0.1:8887"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home(request: Request):
    #todos = db.query(models.Todo).all()
    return templates.TemplateResponse("index.html",
                                      {"request": request})



@app.get("/request")
async def request():
    return {"message":docs}


    
@app.get("/competitions/search/{competition_query}")
async def getCompetitions(competition_query):
    comps = getCompetitionsWithName(competition_query)
    return comps

class LoginInfo(BaseModel):
    username: str
    password: str

@app.post("/login")
async def request(loginInfo: LoginInfo):
    userLoginInfo = getUser(loginInfo.username)
    print(loginInfo)
    if (userLoginInfo == None):
        return {"message":"user not found", "login": 0}

    else:
        if userLoginInfo["password"] == loginInfo.password:
            return {"message":"user found and right password", "login": 2}
        else: 
            return {"message":"user found but wrong password", "login": 1}

        
@app.post("/register")
async def request(loginInfo: LoginInfo):
    userLoginInfo = getUser(loginInfo.username)
    print(loginInfo)
    if (userLoginInfo == None):
        return {"message":"user not found", "login": 0}

    else:
        if userLoginInfo["password"] == loginInfo.password:
            return {"message":"user found and right password", "login": 2}
        else: 
            return {"message":"user found but wrong password", "login": 1}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
