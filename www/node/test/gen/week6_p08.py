from bawrapper import *
class Person:
  def __init__(self,name,age):
    self.name=name
    self.age=age
  def profile(self):
    mesg="{} will be {} years old next year.".format(self.name,self.age +  1 )
    return mesg
y=Person("Yamada", 23 )
t=Person("Tanaka", 30 )
s=Person("Suzuki", 15 )
print(y.profile())
print(t.profile())
print(s.profile())