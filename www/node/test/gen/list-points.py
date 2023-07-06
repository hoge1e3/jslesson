from bawrapper import *

points=[ 62 , 58 , 72 , 60 , 47 , 81 , 74 , 65 , 59 , 38 ]


total= 0 
for pt in points:
  total=total + pt
print("合計点=" + str(total))


ave=total / len(points)
print("平均点=" + str(ave))