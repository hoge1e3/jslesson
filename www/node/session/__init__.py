import os
import json

workdir="/tmp"
def file():
    sid=os.environ["SESSIONID"]
    return f"{workdir}/{sid}.json"
def load():
    if not os.path.exists(file()):
        return dict()
    with open(file(),"r") as fp:
        return json.load(fp)
def get(k):
    data=load()
    return data[k]
def has(k):
    data=load()
    return k in data
def set(k,v):
    data=load()
    data[k]=v
    with open(file(),"w",encoding="utf8") as fp:
        json.dump(data, fp)

    
