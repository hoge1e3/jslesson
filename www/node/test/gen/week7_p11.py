from bawrapper import *
class Person:
  def __init__(self,family_name,given_name,age):
    self.family_name=family_name
    self.given_name=given_name
    self.age=age
  def get_name(self):
    n="{} {}".format(self.family_name,self.given_name)
    return n
y=Person("Yamada","Taro", 23 )
t=Person("Tanaka","Hanako", 50 )
print(y.get_name())
print(t.get_name())