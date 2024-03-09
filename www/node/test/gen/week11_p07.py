from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def __str__(self):
    return "({},{})".format(self.x,self.y)
  def dist(self,p):
    return ((p.x - self.x) **  2  + (p.y - self.y) **  2 ) **  0.5 
class Circle:
  def __init__(self,center,radius):
    self.center=center
    self.radius=radius
  def __str__(self):
    return "[Circle c={} r={}]".format(self.center,self.radius)
c1=Circle(Point( 10 , 10 ), 5 )
c2=Circle(Point( 20 , 10 ), 4 )
p=Point( 13 , 10 )
print(c1.radius,c1.center.dist(p))
print(c2.radius,c2.center.dist(p))