import os
import re
import sys
import json
import builtins as b
#print("Running "+sys.argv[0])
workd=os.path.dirname(sys.argv[0])
conff=workd+"/config.json"
if os.path.isfile(conff):
    #print("Config file= "+conff)
    f = open(conff)
    conf = json.load(f)
    f.close()
else:
    conf = {}
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

def open(filename,mode="r",encoding="UTF-8"):
    rf=resolve(filename)
    if not os.path.exists(os.path.dirname(rf)):
        os.makedirs(os.path.dirname(rf))
    return b.open(rf,mode)

