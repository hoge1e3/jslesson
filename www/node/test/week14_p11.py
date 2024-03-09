a=[]
f=open("user/test.txt","r")
for line in f:
    a.append(line)
f.close()
print(a)
