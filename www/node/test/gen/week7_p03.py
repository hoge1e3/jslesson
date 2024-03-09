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
    p=Point(x,y)
    return p
  def __str__(self):
    return "({},{})".format(self.x,self.y)
p1=Point( 2 , 3 )
p2=Point( 4 , 5 )
print("p1=",p1)
print("p2=",p2)
p1.move( 1 , 10 )
p3=p2.moved( 1 , 10 )
print("p1=",p1)
print("p2=",p2)
print("p3=",p3)