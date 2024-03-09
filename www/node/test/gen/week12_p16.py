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
f=open("user/people.txt","r")
for line in f:
  name,age,weight=line.split(",")
  people.append(Person(name,int(age),int(weight)))
f.close()
people.sort(key=get_age)
for p in people:
  print(p)
