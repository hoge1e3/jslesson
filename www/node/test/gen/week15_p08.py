from bawrapper import *
def prod(a):
  i= 1 
  s= 0 
  for e in a:
    s+=e * i
    i+= 1 
  return s
print(prod([ 1 , 2 , 3 ]))
print(prod([ 3 , 2 , 1 ]))
print(prod([ 1 , 2 , 3 , 4 , 5 ]))
print(prod([ 5 , 2 , 4 , 1 , 3 ]))
print(prod([ 5 , 4 , 3 , 2 , 1 ]))