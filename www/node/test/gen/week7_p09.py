from bawrapper import *
class Person:
  def __init__(self,name,age):
    self.name=name
    self.age=age
  def get_name(self):
    return self.name
  def get_age(self):
    return self.age
  def set_age(self,age):
    if age >=  0 :
      self.age=age
y=Person("Yamada", 23 )
print(y.get_name(),y.get_age())
y.set_age( 24 )
print(y.get_name(),y.get_age())
y.set_age( -  24 )
print(y.get_name(),y.get_age())