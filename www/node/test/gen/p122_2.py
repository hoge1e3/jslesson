import bawrapper
a=[ 56 , 3 , 62 , 17 , 87 , 22 , 36 , 83 , 21 , 12 ]
sum= 0 
for i in bawrapper._range( 0 , 10 , 1 ):
  sum=sum + a[i]
print(sum)
