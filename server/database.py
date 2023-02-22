import pymongo
from bson.json_util import dumps
import re
import sys
import random, string, uuid
from datetime import datetime
import os
import bcrypt
from pymongo import ReturnDocument
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"


myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["mydatabase"]
userCol = mydb["users"]
compCol = mydb["competitions"]
pendingCompCol = mydb["pendingCompetitions"]
rejectedCompCol = mydb["rejectedCompetitions"]
sessions = mydb["sessions"]
Trending = mydb["trending"]

def getCurrentTime():
    return str(datetime.now())

def getRandomString(num):
    return ''.join(random.choices(string.ascii_lowercase, k=num))

def getUserByID(ID):
    user = userCol.find_one({"USERID": ID})
    return user

def getUserByUsername(username):
    username = username.lower();
    user = userCol.find_one({"username": username})
    print(user)
    return user

def getUserByEmail(email):
    email = email.lower();
    user = userCol.find_one({"email": email})
    print(user)
    return user

def getUserBySession(sessionID):
    sessionInfo = sessions.find_one({"SESSIONID": sessionID})
    if sessionInfo == None:
        return None
    # need to check exp date
    return getUserByID(sessionInfo["USERID"])


def addUser(firstName, lastName, username,email, password):
    #force lowercase
    hashedPass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    username = username.lower()
    userID =  str(uuid.uuid4())
    time = getCurrentTime()
    if (getUserByUsername(username) == None and getUserByEmail(email) == None):
        userInfo = { "USERID": userID, "firstName":firstName, "lastName":lastName, "username": username, "password": hashedPass, "email":email, "timeJoined": time, "profilePicture": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}    
        userCol.insert_one(userInfo)
        return loginUser(username,password)
    else:
        if (getUserByEmail(email) != None):
            return -2
        return -1

def deleteUser(username):
    userCol.delete_one({"username": username})

def addCompetition(name,location, description, prize, category1, category2,date, time, images, sessionId, contact):
    creator = getUserBySession(sessionId)
    if creator == None:
        return None
    url = creator["username"]+name+getRandomString(5)
    directory = "static/images/competitions/"+creator["USERID"]+"/"

    if os.path.exists(directory) == False:
        os.makedirs(directory)
        print("making "+ directory+ " directory")
    logoPath = ""
    imagePaths = []
    for i in range(0, len(images)):
        filename = directory+creator["username"]+"_"+getRandomString(5)+images[i].filename
        if (i == 0):
            logoPath = filename
        else:
            imagePaths.append(filename)
        with open(filename, 'wb') as f:
                f.write(images[i].file.read())
    
    competitionInfo = {"name": name,"location": location, "description": description, "category1":category1,"category2":category2,"date":date, "time":time, "images":imagePaths, "prize": prize, "preview": logoPath, "url": url, "creatorName": creator["username"], "contact":contact, "creatorID": creator["USERID"], "timeCreated": getCurrentTime()}
    x = pendingCompCol.insert_one(competitionInfo)
    return x


def createSession(username, userID):
    time = getCurrentTime()
    sessionID = username.upper() + getRandomString(10)
    sessions.insert_one({"SESSIONID":sessionID, "USERID":userID, "username":username, "timeCreated": time})
    return sessionID

def removeSession(sessionID):
    sessions.delete_one({"SESSIONID": sessionID})

def loginUser(username,password):
    userLoginInfo = getUserByUsername(username)
    
    if (userLoginInfo == None):
        userLoginInfo = getUserByEmail(username)
        if (userLoginInfo == None):
            return {"message":"user not found", "login": 0}

    if bcrypt.checkpw(password.encode('utf-8'), userLoginInfo["password"]):
        sessionID = createSession(userLoginInfo["username"],userLoginInfo["USERID"])
        return {"message":"user found and right password", "login": 2, "SESSIONID":sessionID, "username": userLoginInfo["username"], "firstName": userLoginInfo["firstName"], "lastName": userLoginInfo["lastName"], "profilePicture": userLoginInfo["profilePicture"]} 
    else: 
        return {"message":"user found but wrong password", "login": 1}

def getAll():
    cursor =  mycol.find()
    docs = list(cursor)
    docs = dumps(docs, indent=2, sort_keys=True)

def getCompetitionsWithName(name):
    comps = compCol.find({"name":re.compile(name, re.IGNORECASE)},{})
    comps = dumps(comps)
    print(comps)
    return comps

def getCompetitionWithUrl(url, addView):
    if addView:
        comp = compCol.find_one_and_update({"url":url}, {"$inc": {"views":1}}, return_document = ReturnDocument.AFTER) #add view
        if not comp == None:    
            print(comp["name"]+ " competition gotten " + getCurrentTime())
            if (Trending.find_one({"url":url}) == None): #add to trending
                comp["viewDate"] = getCurrentTime()
                comp["viewToday"] = 1
                Trending.insert_one(comp)
            else:
                Trending.find_one_and_update({"url":url}, {"$inc": {"viewToday":1}})
    else:
        comp = compCol.find_one({"url":url},{})
        
    comp = dumps(comp)
    return comp

def getPendingCompetitions():
    comps = pendingCompCol.find()
    comps = dumps(comps)
    return comps

def addAdmin(username):
    #user = getUser(username)
    userCol.update_one({"username": username}, {"$set": {"admin":True} })
    print("added "+ username + " as admin")
    
def removeAdmin(username):
    #user = getUser(username)
    userCol.update_one({"username": username}, {"$set": {"admin":False} })
    print("removed "+ username + " from admin")
   
def approveCompetition(url,official):
    comp = pendingCompCol.find_one({"url": url})
    comp["official"] = official;
    print(comp);
    pendingCompCol.delete_one({"url": url})
    compCol.insert_one(comp)

def rejectCompetition(url):
    comp = pendingCompCol.find_one({"url": url})
    pendingCompCol.delete_one({"url": url})
    rejectedCompCol.insert_one(comp)

#EXPLORE
def getTrendingCompetitions(category):
    comps = compCol.find()
    comps = dumps(comps)
    return comps

def getNewUsers():
    users = userCol.find().sort("timeJoined",-1).limit(5)
    users = dumps(users)
    return users

# system command line arguments
n = len(sys.argv)
for i in range(1,n):
    if (sys.argv[i] == "addAdmin" and i<n-1):
        addAdmin(sys.argv[i+1])

    if (sys.argv[i] == "removeAdmin" and i<n-1):
        removeAdmin(sys.argv[i+1])

        
    if (sys.argv[i] == "deleteUser" and i<n-1):
        deleteUser(sys.argv[i+1])
