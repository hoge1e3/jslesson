from bawrapper import *
class Person:
  def __init__(self,name,age,weight):
    self.name=name
    self.age=age
    self.weight=weight
  def __str__(self):
    return "{} age={} weight={}".format(self.name,self.age,self.weight)
def age_sum(people):
  sum= 0 
  for p in people:
    sum+=p.age
  return sum
groupA=[]
groupA.append(Person("yamada", 20 , 55 ))
groupA.append(Person("tanaka", 50 , 62 ))
groupA.append(Person("suzuki", 15 , 75 ))
groupB=[]
groupB.append(Person("sasaki", 40 , 52 ))
groupB.append(Person("satoh", 25 , 68 ))
print("groupA: {} ".format(age_sum(groupA)))
print("groupB: {} ".format(age_sum(groupB)))