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
communityPosts = mydb["communityPosts"]

def getCommunityPosts():
    posts = communityPosts.find().limit(10) #.sort("timeCreated",pymongo.DESCENDING)
    posts = dumps(posts)
    return posts
