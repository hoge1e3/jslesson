from bawrapper import *

w=float(input("体重kgは？"))
h=float(input("身長cmは？"))


bmi=w / (h /  100 ) **  2 
print("BMI=" + str(bmi))


if bmi <  18.5 :
  print("痩せ型")
elif  18.5  <= bmi <  25 :
  print("普通体重")
elif bmi >=  25 :
  print("肥満")
