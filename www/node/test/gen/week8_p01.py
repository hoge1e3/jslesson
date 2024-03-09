from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def move(self,dx,dy):
    self.x+=dx
    self.y+=dy
  def moved(self,dx,dy):
    x=self.x + dx
    y=self.y + dy
    return Point(x,y)
  def __str__(self):
    return "({},{})".format(self.x,self.y)
p1=Point( 3 , 4 )
p2=Point( 1 , 2 )
print("p1=",p1)
print("p2=",p2)
p3=p1.moved(p2.x,p2.y)
print("p1=",p1)
print("p2=",p2)
print("p3=",p3)