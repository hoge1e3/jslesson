from bawrapper import *
class Player:
  def __init__(self,name,hp,mp,ap):
    self.name=name
    self.hp=hp
    self.mp=mp
    self.ap=ap
  def status(self):
    print("Name: {}".format(self.name))
    print("Hit Point: {}".format(self.hp))
    print("Magic Point: {}".format(self.mp))
    print("Attack Point: {}".format(self.ap))
  def attack(self,target):
    target.hp-=self.ap
  def isLost(self):
    return self.hp <=  0 
print("Player 1")
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
p1=Player(name,hp,mp,ap)
print("Player 2")
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
p2=Player(name,hp,mp,ap)
while  True :
  p1.status()
  p2.status()
  if p1.isLost():
    print(p2.name,"win")
    break
  print(p1.name,"'s attack")
  p1.attack(p2)
  p1.status()
  p2.status()
  if p2.isLost():
    print(p1.name,"win")
    break
  print(p2.name,"'s attack")
  p2.attack(p1)
