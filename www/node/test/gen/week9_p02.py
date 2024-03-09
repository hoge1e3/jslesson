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
  def move(self,d):
    self.center.move(d)
  def __str__(self):
    return "[Circle c={} r={}]".format(self.center,self.radius)
class Rectangle:
  def __init__(self,center,width,height):
    self.center=center
    self.width=width
    self.height=height
  def __str__(self):
    return "[Rectangle c={} size={}x{}]".format(self.center,self.width,self.height)
p1=Point( 3 , 4 )
c=Circle(p1, 2 )
p2=Point( 7 , 5 )
r=Rectangle(p2, 8 , 6 )
print(c)
print(r)
r.move(Point( 1 , 1 ))
c.move(Point( 10 , 10 ))
print(c)
print(r)