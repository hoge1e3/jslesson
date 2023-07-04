import bawrapper

w=bawrapper._float(bawrapper._input("体重kgは？"))
h=bawrapper._float(bawrapper._input("身長cmは？"))


bmi=w / (h /  100 ) **  2 
print("BMI=" + bawrapper._str(bmi))


if bmi <  18.5 :
  print("痩せ型")
elif  18.5  <= bmi <  25 :
  print("普通体重")
elif bmi >=  25 :
  print("肥満")
