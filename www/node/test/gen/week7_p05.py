from bawrapper import *
class Person:
  def __init__(self,name,age):
    self.name=name
    self.age=age
  def get_name(self):
    return self.name
y=Person("Yamada", 23 )
t=Person("Tanaka", 30 )
s=Person("Suzuki", 15 )
print(y.get_name())
print(t.get_name())
print(s.get_name())