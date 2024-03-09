from bawrapper import *
def checkIndex(a,x):
  i= 0 
  for e in a:
    if e == x:
      return i
    i+= 1 
  return  -  1 
a=[ 10 , 25 , 15 , 8 ]
print(checkIndex(a, 25 ))
print(checkIndex(a, 15 ))
print(checkIndex(a, 8 ))
print(checkIndex(a, 10 ))
print(checkIndex(a, 1000 ))