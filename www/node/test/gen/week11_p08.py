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
  def contains(self,p):
    if self.center.dist(p) <= self.radius:
      return  True 
    else:
      return  False 
c1=Circle(Point( 10 , 10 ), 5 )
c2=Circle(Point( 12 , 15 ), 4 )
p1=Point( 4 , 5 )
p2=Point( 10 , 6 )
p3=Point( 14 , 14 )
p4=Point( 14 , 12 )
print("p1 in c1:",c1.contains(p1))
print("p2 in c1:",c1.contains(p2))
print("p3 in c1:",c1.contains(p3))
print("p4 in c1:",c1.contains(p4))
print("p1 in c2:",c2.contains(p1))
print("p2 in c2:",c2.contains(p2))
print("p3 in c2:",c2.contains(p3))
print("p4 in c2:",c2.contains(p4))