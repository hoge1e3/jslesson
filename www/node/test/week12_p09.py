print("c=? ",end="")
c=input()
if c=="new":
    f=open("user/test.txt","w")
    f.close()
else:
    f=open("user/test.txt","w")
    f.write(c+"\n")
    f.close()
