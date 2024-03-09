from bawrapper import *
class Car:
  def __init__(self,mileage,gas,mileage_per_gas):
    self.mileage=mileage
    self.gas=gas
    self.mileage_per_gas=mileage_per_gas
  def __str__(self):
    return "mile={} gas={} mile/gas={}".format(self.mileage,self.gas,self.mileage_per_gas)
  def run(self,mile):
    self.mileage+=mile
    self.gas-=(mile / self.mileage_per_gas)
cars=[]
cars.append(Car( 50 , 10 , 12 ))
cars.append(Car( 30 , 20 , 15 ))
cars.append(Car( 0 , 17 , 20 ))
for c in cars:
  print(c)
dis=float(input("distance=?"))
print("----")
for c in cars:
  c.run(dis)
for c in cars:
  print(c)
