from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def __str__(self):
    return "({},{})".format(self.x,self.y)
p1=Point( 3 , 4 )
p2=Point( 12 , 5 )
print(p1)
print(p2)
print("p1={} p2={}".format(p1,p2))