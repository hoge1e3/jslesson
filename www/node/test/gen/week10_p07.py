from bawrapper import *
class Person:
  def __init__(self,name,age,weight):
    self.name=name
    self.age=age
    self.weight=weight
  def __str__(self):
    return "{} age={} weight={}".format(self.name,self.age,self.weight)
  def gain_weight(self,by):
    self.weight+=by
p1=Person("yamada", 20 , 55 )
print(p1)
p1.gain_weight( 3 )
print(p1)
p1.gain_weight( 1 )
print(p1)