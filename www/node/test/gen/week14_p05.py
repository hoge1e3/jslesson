from bawrapper import *
def checkData(a,x):
  for e in a:
    if e == x:
      return  True 
  return  False 
a=[ 10 , 25 , 15 , 8 ]
if checkData(a, 25 ):
  print( 25 ," is in ",a)
else:
  print( 25 ," is not in ",a)
if checkData(a, 35 ):
  print( 35 ," is in ",a)
else:
  print( 35 ," is not in ",a)
print(checkData(a, 100 ))
print(checkData(a, 8 ))
print(checkData(a, 10 ))
print(checkData(a, 1000 ))
print(checkData(a, 25 ))