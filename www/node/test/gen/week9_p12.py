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
class AttackerPlayer:
  def status(self):
    super().status()
    print("Ability: ap+1 on attack")
  def attack(self,target):
    super().attack(target)
    self.ap+= 1 
p1=Player("Slime", 100 , 10 , 5 )
p2=AttackerPlayer("Dragon", 10 , 10 , 1 )
print("Game Start")
p1.status()
p2.status()
for i in range( 1 , 4 ):
  print("Turn",i)
  p1.status()
  p2.status()
  p2.attack(p1)
