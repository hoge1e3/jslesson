from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def sub_points(self,other):
    dx=self.x - other.x
    dy=self.y - other.y
    p=Point(dx,dy)
    return p
  def dist1(self):
    return (self.x **  2  + self.y **  2 ) ** ( 1  /  2 )
  def dist2(self,other):
    sp=self.sub_points(other)
    d=sp.dist1()
    return d
a=Point( -  2 , -  5 )
b=Point( 3 , -  6 )
c=Point( 4 , 4 )
d=Point( -  5 , 1 )
dist_ab=a.dist2(b)
dist_bc=b.dist2(c)
dist_cd=c.dist2(d)
dist_da=d.dist2(a)
print(dist_ab)
print(dist_bc)
print(dist_cd)
print(dist_da)