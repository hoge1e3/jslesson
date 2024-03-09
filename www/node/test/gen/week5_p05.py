from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
def dist1(p):
  return (p.x **  2  + p.y **  2 ) ** ( 1  /  2 )
p1=Point( 3 , 4 )
p2=Point( 12 , 5 )
print(dist1(p1))
print(dist1(p2))