import bawrapper
v= 0 
i= 1 
while i <=  10 :
  print(bawrapper._str(v) +  "+"  + bawrapper._str(i) +  "="  + bawrapper._str(v + i))
  v=v + i
  i=i +  1 
print( "---" )
print( "合計="  + bawrapper._str(v))
