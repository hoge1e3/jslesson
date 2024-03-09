from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def move(self,dx,dy):
    self.x+=dx
    self.y+=dy
  def __str__(self):
    return "({},{})".format(self.x,self.y)
p1=Point( 3 , 4 )
print(p1)
p1.move( 1 , -  2 )
print(p1)