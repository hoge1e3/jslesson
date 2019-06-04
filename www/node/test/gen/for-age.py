import bawrapper
base_year= 2018 
for i in bawrapper._range( 100 ):
  y=base_year - i
  print( "西暦"  + bawrapper._str(y) +  "年 = 満"  + bawrapper._str(i) +  "歳" )
