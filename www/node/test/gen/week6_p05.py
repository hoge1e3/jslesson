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
a=Point( -  2 , -  5 )
b=Point( 3 , -  6 )
c=Point( 4 , 4 )
d=Point( -  5 , 1 )
ab=a.sub_points(b)
bc=b.sub_points(c)
cd=c.sub_points(d)
da=d.sub_points(a)
print(ab.x,ab.y)
print(bc.x,bc.y)
print(cd.x,cd.y)
print(da.x,da.y)