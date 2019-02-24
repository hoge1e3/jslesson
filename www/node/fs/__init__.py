import os
def _open(filename,mode):
    asset=os.getenv("BAASSETPATH")
    filename=asset+"/"+filename
    print ("%s open sitafuri"%(filename))
