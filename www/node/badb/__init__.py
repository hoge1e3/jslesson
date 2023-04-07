import bawrapper
import requests
import json

def getConf():
    return bawrapper.conf


conf=(getConf())
u=conf["asset"]["class"]["url"]
curGroup="default"
def setGroup(g):
    global curGroup
    curGroup=g

def findLog(practice, data1=None, data2=None, data3=None, data4=None, group=curGroup):
    url = conf["topURL"]+"?BigData/find" # 使用するWebAPI のURL
    param = {"group": group, "practice": practice, "url":u} #WebAPI の引数
    if data1:
        param["data1"]=data1
    if data2:
        param["data2"]=data2
    if data3:
        param["data3"]=data3
    if data4:
        param["data4"]=data4
    res = requests.get(url,params=param) #WebAPI の戻り値がres へ
    return json.loads(res.text)

def addLog(practice, data1=None, data2=None, data3=None, data4=None, group=curGroup):
    url = conf["topURL"]+"?BigData/add" # 使用するWebAPI のURL
    param = {"group": group, "practice": practice, "url":u} #WebAPI の引数
    if data1:
        param["data1"]=data1
    if data2:
        param["data2"]=data2
    if data3:
        param["data3"]=data3
    if data4:
        param["data4"]=data4
    res = requests.get(url,params=param) #WebAPI の戻り値がres へ

def putToServer(key, value, group=curGroup):
    url = conf["topURL"]+"?KeyValue/put" # 使用するWebAPI のURL
    param = {"group": group, "key": key, "value": value, "url":u} #WebAPI の引数
    res = requests.get(url,params=param) #WebAPI の戻り値がres へ

def getFromServer(key, group=curGroup):
    url = conf["topURL"]+"?KeyValue/get" # 使用するWebAPI のURL
    param = {"group": group, "key": key, "url":u} #WebAPI の引数
    res = requests.get(url,params=param) #WebAPI の戻り値がres へ
    return res.text
