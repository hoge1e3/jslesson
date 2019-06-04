import bawrapper

def calc_fee(age,is_monday):
  fee= 2000 
  
  if age <  3 :
    fee= 0 
  elif age <  6 :
    fee= 500 
  elif age >=  60 :
    fee= 1500 
  
  if is_monday:
    fee=bawrapper._int(fee *  0.8 )
  return fee


print((calc_fee( 18 , False )))
print((calc_fee( 20 , True )))
print((calc_fee( 2 , False )))
print((calc_fee( 70 , True )))
