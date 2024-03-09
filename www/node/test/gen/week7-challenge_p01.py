from bawrapper import *
class Player:
  def __init__(self,name,hp,mp,ap,dp):
    self.name=name
    self.hp=hp
    self.mp=mp
    self.ap=ap
    self.dp=dp
  def status(self):
    print("Name: {}".format(self.name))
    print("Hit Point: {}".format(self.hp))
    print("Magic Point: {}".format(self.mp))
    print("Attack Point: {}".format(self.ap))
    print("Defence Point: {}".format(self.dp))
  def attack(self,target):
    target.damage(self.ap)
  def damage(self,p):
    d=p - self.dp
    if d >  0 :
      self.hp-=d
print("Player 1")
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
dp=int(input("dp=?"))
p1=Player(name,hp,mp,ap,dp)
print("Player 2")
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
dp=int(input("dp=?"))
p2=Player(name,hp,mp,ap,dp)
p1.status()
p2.status()
p1.attack(p2)
p1.status()
p2.status()
p2.attack(p1)
p1.status()
p2.status()