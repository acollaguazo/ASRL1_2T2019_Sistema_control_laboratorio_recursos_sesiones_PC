#!/usr/bin/env python
import pymongo
import time
import os
from pymongo import MongoClient
client = MongoClient()
client = MongoClient('200.126.13.226', 27017)
db = client.laboratorio
alarmas=db.alarmas
file="/tmp/devices.log"
def logsExist(file):
	try:
		logs = open(file)
		logs.close()
		return 1
	except:
		return 0

while(1):
	if(logsExist(file)):
		logs = open(file)
		evento=logs.readline()
		alarmas.update_one({"name": "PC-C"},{"$set": {"description": evento,"type": "warning" }})
		time.sleep(150) #Wait 2.5mins
		alarmas.update_one({"name": "PC-C"},{"$set": {"description": 0}})
		os.remove(file)
		logs.close()
	time.sleep(0.5)
