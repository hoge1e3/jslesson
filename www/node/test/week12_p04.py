f=open("user/test.txt","r")
for line in f:
    print(">", line, end="")
f.close()
