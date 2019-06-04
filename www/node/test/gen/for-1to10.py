import bawrapper
v= 0 
for k in bawrapper._range( 10 ):
  i=k +  1 
  print(bawrapper._str(v) +  "+"  + bawrapper._str(i) +  "="  + bawrapper._str(v + i))
  v=v + i
print( "---" )
print( "合計="  + bawrapper._str(v))
