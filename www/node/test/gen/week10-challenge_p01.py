from bawrapper import *
class Person:
  def __init__(self,name,age,weight,height):
    self.name=name
    self.age=age
    self.weight=weight
    self.height=height
  def __str__(self):
    return "{} age={} weight={} height={} bmi={}".format(self.name,self.age,self.weight,self.height,self.bmi())
  def gain_weight(self,by):
    self.weight+=by
  def bmi(self):
    b=self.weight / ((self.height /  100 ) **  2 )
    return b
def get_bmi(p):
  return p.bmi()
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
  print("height=?",end="")
  height=int(input())
  people.append(Person(name,age,weight,height))
people.sort(key=get_bmi)
for p in people:
  print(p)
