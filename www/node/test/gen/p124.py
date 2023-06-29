import bawrapper
def listsum(a):
  sum= 0 
  for i in bawrapper._range( 0 ,bawrapper._len(a), 1 ):
    sum=sum + a[i]
  return sum
a=[ 56 , 3 , 62 , 17 , 87 , 22 , 36 , 83 , 21 , 12 ]
bawrapper._sum=listsum(a)
print(bawrapper._sum)