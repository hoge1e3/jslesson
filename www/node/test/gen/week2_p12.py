from bawrapper import *
a=[]
while  True :
  x=int(input("x=?"))
  if x <  0 :
    break
  a.append(x)
for i in range(len(a)):
  print(a[ - i -  1 ])
