import bawrapper
a=[ 56 , 3 , 62 , 17 , 87 , 22 , 36 , 83 , 21 , 12 ]
bawrapper._sum= 0 
for i in bawrapper._range( 0 , 10 , 1 ):
  bawrapper._sum=bawrapper._sum + a[i]
print(bawrapper._sum)