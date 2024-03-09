from bawrapper import *
class Person:
  def __init__(self,name,age,weight):
    self.name=name
    self.age=age
    self.weight=weight
  def __str__(self):
    return "{} age={} weight={}".format(self.name,self.age,self.weight)
def get_age(p):
  return p.age
people=[]
people.append(Person("yamada", 20 , 55 ))
people.append(Person("tanaka", 50 , 62 ))
people.append(Person("suzuki", 15 , 75 ))
people.append(Person("sasaki", 40 , 52 ))
people.append(Person("satoh", 25 , 68 ))
people.sort(key=get_age)
for p in people:
  print(p)
