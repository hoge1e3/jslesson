import os
import re
import sys
import json
#print("Running "+sys.argv[0])
workd=os.path.dirname(sys.argv[0])
conff=workd+"/config.json"
#print("Config file= "+conff)
f = open(conff)
conf = json.load(f)
f.close()
#print(conf["sharedAsset"], conf["sharedAsset"]==os.getenv("BAASSETPATH"))

def _open(filename,mode="r"):
    [context,name]=filename.split("/")
    if context in conf["asset"]:
        asset=conf["asset"][context]["file"]
        asset=re.sub(r'[\\/]$',"",asset)
        #filename=re.sub(r'[\\/]',"",name)
        filename=asset+"/"+name
        #print ("%s open sitafuri"%(filename))
        return open(filename,mode)
    else:
        raise Exception("directory %s is not found "%(context))
def _range(*a,**k):
    return range(*a,**k)
def _input(*a,**k):
    return input(*a,**k)
def _str(*a,**k):
    return str(*a,**k)
def _int(*a,**k):
    return int(*a,**k)
def _float(*a,**k):
    return float(*a,**k)
def _len(*a,**k):
    return len(*a,**k)
