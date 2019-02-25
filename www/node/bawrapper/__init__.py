import os
import re
def _open(filename,mode="r"):
    asset=os.getenv("BAASSETPATH")
    filename=re.sub(r'[\\/]',"",filename)
    filename=asset+"/"+filename
    return open(filename,mode)
    #print ("%s open sitafuri"%(filename))
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
