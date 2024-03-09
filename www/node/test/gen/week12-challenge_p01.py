from bawrapper import *
f=open("user/count.txt","r")
line=f.readline()
f.close()
count=int(line)
print("Run",count,"times.")
f=open("user/count.txt","w")
f.write(str(count +  1 ))
f.close()