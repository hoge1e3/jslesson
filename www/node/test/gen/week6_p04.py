from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def mul(self,k):
    p=Point(self.x * k,self.y * k)
    return p
p1=Point( 2 , 3 )
p2=Point( 4 , 5 )
p3=p1.mul( 10 )
p4=p2.mul( 20 )
print(p3.x,p3.y)
print(p4.x,p4.y)