from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
def sub_points(p1,p2):
  dx=p1.x - p2.x
  dy=p1.y - p2.y
  p=Point(dx,dy)
  return p
def dist1(p):
  return (p.x **  2  + p.y **  2 ) ** ( 1  /  2 )
def dist2(p1,p2):
  sp=sub_points(p1,p2)
  d=dist1(sp)
  return d
a=Point( -  2 , -  5 )
b=Point( 3 , -  6 )
c=Point( 4 , 4 )
d=Point( -  5 , 1 )
dist_ab=dist2(a,b)
dist_bc=dist2(b,c)
dist_cd=dist2(c,d)
dist_da=dist2(d,a)
print(dist_ab)
print(dist_bc)
print(dist_cd)
print(dist_da)