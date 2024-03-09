a=[]
f=open("user/test.txt","r")
for line in f:
    a.append(line)
f.close()
f=open("user/test_line.txt","w")
i = 1
for line in a:
    msg = "{} {}".format(i,line)
    f.write(msg)
    i+=1
f.close()
