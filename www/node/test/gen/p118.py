import bawrapper
x= 0 
print("x = ",x)
for i in bawrapper._range( 1 , 6 , 1 ):
  x=x +  10 
  if i %  2  ==  1 :
    print("x = ",x)
