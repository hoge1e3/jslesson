import bawrapper
import random
a= 5 
r=random.randrange( 10 )
print( "r=" ,r)
if a == r:
  print( " 当たり " )
elif a > r:
  print( "a の方が大きい " )
elif a < r:
  print( "a の方が小さい " )
