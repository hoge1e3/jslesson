from bawrapper import *
def is_ascend(a):
  for i in range(len(a) -  1 ):
    if a[i] > a[i -  1 ]:
      return  False 
  return  True 
a=[ 10 , 25 , 15 , 8 ]
if is_ascend(a):
  print(a," is ascend ordered")
else:
  print(a," is not ascend ordered")
print(is_ascend([ 10 , 50 ]))
print(is_ascend([ 10 , 50 , 100 , 100 , 200 ]))
print(is_ascend([ 20 , 30 , 40 , 39 , 500 , 1000 ]))
print(is_ascend([ -  20 , -  5 , -  4 , -  1 , -  0.5 , -  0.6 , 0 ]))