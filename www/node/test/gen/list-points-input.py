import bawrapper

points=[]


while  True :
  s=bawrapper._input("点数は? ")
  if (s == "") or (s == "q"):
    break
  v=bawrapper._int(s)
  points.append(v)


total= 0 
for v in points:
  total=total + v
print("合計点=" + bawrapper._str(total))
ave=total / bawrapper._len(points)
print("平均点=" + bawrapper._str(ave))