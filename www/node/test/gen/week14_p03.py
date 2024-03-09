from bawrapper import *
data=[]
c=int(input("c=?"))
for i in range(c):
  x=int(input("data=?"))
  data.append(x)
for i in range(c):
  print("data{}={}".format(c - i,data[c - i -  1 ]))
