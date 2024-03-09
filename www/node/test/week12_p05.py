f=open("user/test.txt","r")
i=1
for line in f:
    print(i, line, end="")
    i+=1
f.close()
