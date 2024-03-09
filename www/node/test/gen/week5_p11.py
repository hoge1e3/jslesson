from bawrapper import *
class Person:
  def __init__(self,name,age):
    self.name=name
    self.age=age
def profile(person):
  mesg="{} will be {} years old next year.".format(person.name,person.age +  1 )
  return mesg
y=Person("Yamada", 23 )
t=Person("Tanaka", 30 )
s=Person("Yamada", 15 )
print(profile(y))
print(profile(t))
print(profile(s))