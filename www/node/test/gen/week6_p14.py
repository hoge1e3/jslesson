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
y=Player("Yamada", 20 , 15 , 5 )
t=Player("Tanaka", 30 , 10 , 8 )
y.status()
t.status()