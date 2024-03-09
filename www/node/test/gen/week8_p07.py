from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def move(self,d):
    self.x+=d.x
    self.y+=d.y
  def __add__(self,d):
    x=self.x + d.x
    y=self.y + d.y
    return Point(x,y)
  def __str__(self):
    return "({},{})".format(self.x,self.y)
class Circle:
  def __init__(self,center,radius):
    self.center=center
    self.radius=radius
p=Point( 3 , 4 )
c=Circle(p, 5 )
print(c.radius)
print(c.center)
print(c.center.x,c.center.y)