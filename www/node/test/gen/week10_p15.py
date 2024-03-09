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
def get_age(p):
  return p.age
people=[]
print("n=?",end="")
n=int(input())
for i in range(n):
  print("name=?",end="")
  name=input()
  print("age=?",end="")
  age=int(input())
  print("weight=?",end="")
  weight=int(input())
  people.append(Person(name,age,weight))
people.sort(key=get_age)
for p in people:
  print(p)
