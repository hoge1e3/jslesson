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
  def moved(self,d):
    c=Circle(self.center + d,self.radius)
    return c
  def __str__(self):
    return "[Circle c={} r={}]".format(self.center,self.radius)
  def radius_changed(self,r):
    c=Circle(self.center,r)
    return c
p=Point( 3 , 4 )
c1=Circle(p, 5 )
c2=c1.moved(Point( 10 , 10 ))
c3=c2.radius_changed( 1 )
c4=c1.radius_changed( 7 )
print("c1=",c1)
print("c2=",c2)
print("c3=",c3)
print("c4=",c4)