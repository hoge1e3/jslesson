from bawrapper import *
class Player:
  def __init__(self,name,hp,mp,ap):
    self.name=name
    self.hp=hp
    self.mp=mp
    self.ap=ap
y=Player("yamada", 20 , 15 , 5 )
print(y.name,y.hp)
y.hp-= 3 
print(y.name,y.hp)