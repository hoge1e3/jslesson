import bawrapper
c= 0 
while c <  10 :
  print(" --- ")
  s=bawrapper._input("インチは？")
  if s == "":
    break
  inch=bawrapper._float(s)
  cm=inch *  2.54 
  print(bawrapper._str(cm) + "センチです")
  c+= 1 
