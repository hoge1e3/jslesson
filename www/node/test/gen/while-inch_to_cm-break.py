from bawrapper import *
c= 0 
while c <  10 :
  print(" --- ")
  s=input("インチは？")
  if s == "":
    break
  inch=float(s)
  cm=inch *  2.54 
  print(str(cm) + "センチです")
  c+= 1 
