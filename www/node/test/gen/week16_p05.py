from bawrapper import *
def ideal_weight(height):
  return (height **  2 ) *  22 
def over_weight(weight,height):
  i=ideal_weight(height /  100 )
  if weight - i >=  3 :
    return  True 
  else:
    return  False 
weight=int(input("weight=?"))
height=int(input("height=?"))
print("Your ideal weight =",ideal_weight(height /  100 ))
if over_weight(weight,height):
  print("You have to lose weight")
else:
  print("Good")
