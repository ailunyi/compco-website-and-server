import pymongo
from bson.json_util import dumps
import re
import sys
import random, string, uuid
from datetime import datetime
import time
import os
import bcrypt
from pymongo import ReturnDocument
from PIL import Image
import io
import cropper
import numpy as np
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"


myclient = pymongo.MongoClient("mongodb://admin2:Ismell123@compco.cc:27018/admin")
mydb = myclient["mydatabase"]
userCol = mydb["users"]
compCol = mydb["competitions"]
pendingCompCol = mydb["pendingCompetitions"]
rejectedCompCol = mydb["rejectedCompetitions"]
sessions = mydb["sessions"]
Trending = mydb["trending"]
activityComments = mydb["activityComments"]
activityLikes = mydb["activityLikes"]
locationdata = mydb["locations"]
locations = np.array([doc for doc in locationdata["region"].find()])
def locationSearch(string):
    return [s for s in locations if string in s]

def getCurrentTime():
    return str(datetime.now())
def getCurrentDate():
    return str(datetime.now().date())

# so javascript can understand
def getCurrentTimeMktime():
    return str(int(time.mktime(datetime.now().timetuple())))

def getRandomString(num):
    return ''.join(random.choices(string.ascii_uppercase, k=num))

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



def editUserProfile(userInfo):
    print("editing " + userInfo["username"] + "'s profile")
    user = getUserBySession(userInfo["sessionId"])
    if (user == None): return 0; #user not found, could be exploiter
    userCol.update_one({"USERID": user["USERID"]}, {"$set": {"firstName":userInfo["firstName"],
    "lastName":userInfo["lastName"],"contact":userInfo["contact"],"school":userInfo["school"],
    "birthday":userInfo["birthday"],"bio":userInfo["bio"]}})

def deleteUser(username):
    userCol.delete_one({"username": username})

def toggleActivityLike(userID, competitionUrl, change):
    like = activityLikes.find_one({"competitionUrl":competitionUrl,"userID":userID},{})
    if not change: #dont add or subtract
        return not (like == None)
    if like == None:
        activityLikes.insert_one({"competitionUrl":competitionUrl,"userID":userID})
        compCol.find_one_and_update({"url":competitionUrl}, {"$inc": {"likes":1}})
        return True
    else:
        activityLikes.delete_one({"competitionUrl":competitionUrl,"userID":userID})
        compCol.find_one_and_update({"url":competitionUrl}, {"$inc": {"likes":-1}})
        return False

def addActivityComment(userID,username,profilePic, competitionUrl, message):
    time = getCurrentTime()
    mktime = getCurrentTimeMktime()
    COMMENTID = str(uuid.uuid4())
    activityComments.insert_one({
        "timeCreated":time,
        "mktimeCreated":mktime,
        "COMMENTID":COMMENTID,
        "USERID":userID,
        "username":username,
        "profilePic":profilePic,
        "competitionUrl":competitionUrl,
        "message":message,
        "likes":0,
        "dislikes":0
    })
    comp = compCol.find_one_and_update({"url":competitionUrl}, {"$inc": {"comments":1}}, return_document = ReturnDocument.AFTER) #add view
    if not comp == None:    
        print(comp["name"]+ " competition gotten " + getCurrentTime())
        if (Trending.find_one({"url":competitionUrl}) == None): #add to trending
            comp["viewDate"] = getCurrentTime()
            comp["commentToday"] = 1
            Trending.insert_one(comp)
        else:
            Trending.find_one_and_update({"url":competitionUrl}, {"$inc": {"commentToday":1}})

    print(userID + " commented on "+competitionUrl)

def getActivityComments(url):
    comments = activityComments.find({"competitionUrl":url},{}).sort("timeCreated",pymongo.DESCENDING).limit(10)
    comments = dumps(comments)
    print(comments)
    return comments


def addCompetition(compInfo,images):
    creator = getUserBySession(compInfo["sessionId"])
    if creator == None:
        return None
    url = creator["username"]+"_"+getRandomString(6)
    directory = "static/images/competitions/"+creator["USERID"]+"/"+getRandomString(6)+"/"

    if os.path.exists(directory) == False:
        os.makedirs(directory)
        print("making "+ directory+ " directory")
    logoPath = ""
    imagePaths = []
    for i in range(0, len(images)):
        filename = directory+getRandomString(3)+"_"+images[i].filename
        
        if (i == 0):
            logoPath = filename        
            cropDetails = compInfo["croppedLogoDetails"]
        else:
            imagePaths.append(filename)
            cropDetails = compInfo["croppedDetails"][i-1]

        img = Image.open(io.BytesIO(images[i].file.read()))
        box = (int(cropDetails["x"]), int(cropDetails["y"]), int(cropDetails["x"]+cropDetails["width"]), int(cropDetails["y"]+cropDetails["height"]))
        if (images[i].content_type == "image/gif"):
            img2 = cropper.MultiFrameImage(img)
            croppedImage = img2.crop(box)
            buffered = io.BytesIO()
            croppedImage.save(filename, format="GIF",  loop=0, save_all=True, duration= img.info['duration'])
        else:
            #crop images
            croppedImg = img.crop(box)
            if (i == 0):
                croppedImg.thumbnail((300, 200))
            else: #change image resolution
                croppedImg.thumbnail((1080, 1080))
            if (images[i].content_type != "image/png"):
                croppedImg = croppedImg.convert('RGB')
            croppedImg.save(filename)
        # with open(filename, 'wb') as f:
        #     f.write(compInfo["images"][i].file.read())
    
    competitionInfo = {"name": compInfo["name"],
    "region":compInfo["region"],"location":compInfo["location"],"online":compInfo["isOnline"],
    "description": compInfo["description"],"registerLocation":compInfo["signUpLocation"],
    "category1":compInfo["chosenCategory1"],"category2":compInfo["chosenCategory2"],
    "difficulty":compInfo["chosenDifficulty"],"type":compInfo["chosenType"],
    "dateRegister":compInfo["dateRegister"], "timeRegister":compInfo["timeRegister"],
    "dateStart":compInfo["dateStart"],"timeStart":compInfo["timeStart"],
    "dateEnd":compInfo["dateEnd"],"timeEnd":compInfo["timeEnd"],
    "images":imagePaths, "prize": compInfo["prize"],"fee": compInfo["fee"],
    "organization":compInfo["organization"],"requirements":compInfo["requirements"],
    "preview": logoPath, "url": url, "creatorName": creator["username"],"creatorRealName": creator["firstName"]+" "+creator["lastName"],"creatorAdmin": creator["admin"],
    "contact":compInfo["contact"], "creatorID": creator["USERID"], "timeCreated": getCurrentTimeMktime()}
    
    locationdata.update_one({"region":compInfo["region"]}, {"$inc": {"compsHosted":1}})
    x = pendingCompCol.insert_one(competitionInfo)
    return x

def isActive(compID):
    return compCol.find_one({"compID":compID},{})["dateEnd"] < datetime.now().date()

def getActiveComps():
    return compCol.find().where('this.dateEnd < {}'.format(datetime.now().date()))

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


#SEARCH OPTIONS
def getCompetitionsWithName(name):
    if (name == "all"):
        comps = compCol.find()
    else:
        comps = compCol.find({"name":re.compile(name, re.IGNORECASE)},{})
    comps = dumps(comps)
    print(comps)
    return comps

def getCompetitionWithUrl(url, addView):
    if addView:
        comp = compCol.find_one_and_update({"url":url}, {"$inc": {"views":1}}, return_document = ReturnDocument.AFTER) #add view
        if not comp == None:    
            print(comp["name"]+ " competition gotten " + getCurrentTime())
            locationdata.update_one({"region":comp["region"]}, {"$inc": {"timesViewed":1}})
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


#FILTERS
def applyAllFilters(filters:dict):
    query = {}

    if "category" in filters:
        cat1,cat2 = filters["category"]
        if cat1:
            query["category1"] = cat1
        if cat2:
            query["category2"] = cat2
    
    if "date" in filters:
        d1,d2 = filters["date"]
        query["date"] = {}
        if d1:
            query["date"]["$gte"] = d1
        if d2:
            query["date"]["$lte"] = d2
    
    if "difficulty" in filters:
        query["difficulty"] = filters["difficulty"]
    
    if "region" in filters:
        query["region"] = filters["region"]
    
    if "online" in filters:
        query["online"] = "Yes"
    
    if "free" in filters:
        query["fee"] = ""
    
    comps = compCol.find(query).sort("views",pymongo.DESCENDING)
    comps = dumps(comps)
    print(comps)
    return comps

# def filterCategory(cat1,cat2):
#     if cat2=="Any":
#         comps = compCol.find({"category1":cat1}).where('this.dateEnd < ' + getCurrentDate()).sort("views",pymongo.DESCENDING)
#     else:
#         comps = compCol.find({"category1":cat1,"category2":cat2}).where('this.dateEnd < ' + getCurrentDate()).sort("views",pymongo.DESCENDING)
#     comps = dumps(comps)
#     return comps

# def filterDate(d1,d2):

#     if(d1=="None"):
#         if(d2=="None"):
#             comps = compCol.find().sort("views",pymongo.DESCENDING)
#         else:
#             comps = compCol.find().where('this.dateEnd < ' + d2)
#     else:
#         if(d2=="None"):
#             comps = compCol.find().where('this.dateStart > ' + d1)
#         else:
#             comps = compCol.find().where('this.dateStart > {} && this.dateEnd < {}'.format(d1,d2))

# def filterDifficulty(diff):
#     comps = compCol.find({"difficulty":diff}).sort("views",pymongo.DESCENDING)
#     comps = dumps(comps)
#     return comps

# def filterLocation(loc):
#     comps = compCol.find({"region":loc})
#     comps = dumps(comps)
#     return comps


#ADMIN STUFF
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
    if (category == "all"):
        comps = compCol.find().sort("views",pymongo.DESCENDING).limit(8)#.where('this.dateEnd < ' + getCurrentDate())
    else:
        comps = compCol.find({"category1":category}).sort("views",pymongo.DESCENDING).limit(8)#.where('this.dateEnd < ' + getCurrentDate())
    comps = dumps(comps)
    return comps

def getNewestCompetitions(category):
    if (category == "all"):
        comps = compCol.find().sort("timeCreated",pymongo.DESCENDING).limit(8)
    else:
        comps = compCol.find({"category1":category}).sort("timeCreated",pymongo.DESCENDING).limit(8)
    comps = dumps(comps)
    return comps

def getTrendingSubcategory(category,subcategory):
    comps = compCol.find({"category1":category,"category2":subcategory}).sort("views",pymongo.DESCENDING).limit(10)#.where('this.dateEnd < ' + getCurrentDate())
    comps = dumps(comps)
    return comps

def getNewUsers():
    users = userCol.find().sort("timeJoined",-1).limit(5)
    users = dumps(users)
    return users

#PROFILE
def getUser(name):
    users = userCol.find_one({"username":name})
    users = dumps(users)
    return users

def getUserMadeComps(id):
    comps = compCol.find({"creatorID":id})
    comps = dumps(comps)
    return comps

# system command line arguments
n = len(sys.argv)
for i in range(1,n):
    if (sys.argv[i] == "addAdmin" and i<n-1):
        addAdmin(sys.argv[i+1])

    if (sys.argv[i] == "removeAdmin" and i<n-1):
        removeAdmin(sys.argv[i+1])

        
    if (sys.argv[i] == "deleteUser" and i<n-1):
        deleteUser(sys.argv[i+1])
