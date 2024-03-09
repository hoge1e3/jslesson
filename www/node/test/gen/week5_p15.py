from bawrapper import *
class Player:
  def __init__(self,name,hp,mp,ap):
    self.name=name
    self.hp=hp
    self.mp=mp
    self.ap=ap
def status(p):
  print("Name: {}".format(p.name))
  print("Hit Point: {}".format(p.hp))
  print("Magic Point: {}".format(p.mp))
  print("Attack Point: {}".format(p.ap))
def attack(attacker,defender):
  defender.hp-=attacker.ap
y=Player("yamada", 20 , 15 , 5 )
t=Player("tanaka", 30 , 10 , 8 )
status(y)
status(t)
attack(y,t)
status(y)
status(t)
attack(t,y)
status(y)
status(t)