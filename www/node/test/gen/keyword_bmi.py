import bawrapper

def calc_bmi(weight,height):
  return weight / (height /  100 ) **  2 


bmi1=calc_bmi(weight= 65 ,height= 150 )
print("bmi1=" + bawrapper._str(bmi1))

bmi2=calc_bmi(height= 150 ,weight= 65 )
print("bmi2=" + bawrapper._str(bmi2))