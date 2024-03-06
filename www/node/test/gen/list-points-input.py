from bawrapper import *

points=[]


while  True :
  s=input("点数は? ")
  if (s == "") or (s == "q"):
    break
  v=int(s)
  points.append(v)


total= 0 
for v in points:
  total=total + v
print("合計点=" + str(total))
ave=total / len(points)
print("平均点=" + str(ave))