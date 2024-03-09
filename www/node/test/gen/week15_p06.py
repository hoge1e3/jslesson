from bawrapper import *
def sumOdd(a):
  c= 0 
  for x in a:
    if x %  2  ==  1 :
      c+=x
  return c
a=[ 7 , 3 , 5 , 2 ]
print(sumOdd(a))
a=[ 2 , 7 , 11 , 6 , 2 , 10 , 18 ]
print(sumOdd(a))
a=[ 2 , 8 , 11 , 5 , 4 , 13 , 17 ]
print(sumOdd(a))