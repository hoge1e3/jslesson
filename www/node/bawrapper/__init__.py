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
def resolve(filename):
    if not re.search(r'/',filename):
        raise Exception("Use user/file or class/file  ")
    [context,name]=filename.split("/")
    if re.search(r'\.(php|cgi)$',name):
        raise Exception("Invalid name %s "%(name))
    if context in conf["asset"]:
        asset=conf["asset"][context]["file"]
        asset=re.sub(r'[\\/]$',"",asset)
        #filename=re.sub(r'[\\/]',"",name)
        filename=asset+"/"+name
        return filename
    else:
        raise Exception("directory %s is not found "%(context))

def _open(filename,mode="r",encoding="UTF-8"):
    rf=resolve(filename)
    if not os.path.exists(os.path.dirname(rf)):
        os.makedirs(os.path.dirname(rf))
    return open(rf,mode)
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
    r=input(*a,**k)
    #print (r)
    return r
def _str(*a,**k):
    return str(*a,**k)
_int=int
#def _int(*a,**k):
#    return int(*a,**k)
def _float(*a,**k):
    return float(*a,**k)
def _len(*a,**k):
    return len(*a,**k)
def _type(*a,**k):
    return type(*a,**k)
def _exit(*a,**k):
    return exit(*a,**k)
def _quit(*a,**k):
    return quit(*a,**k)
def _sorted(*a,**k):
    return sorted(*a,**k)
def _abs(*a,**k):
    return abs(*a,**k)
def _min(*a,**k):
    return min(*a,**k)
def _max(*a,**k):
    return max(*a,**k)
