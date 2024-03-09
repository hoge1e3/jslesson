from bawrapper import *
class Person:
  def __init__(self,name,age):
    self.name=name
    self.age=age
p=Person("Yamada", 50 )
mesg="name={} age={} ".format(p.name,p.age)
print(mesg)