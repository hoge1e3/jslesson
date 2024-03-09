from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def move(self,dx,dy):
    self.x+=dx
    self.y+=dy
  def __str__(self):
    return "({},{})".format(self.x,self.y)
x=int(input("x=?"))
y=int(input("y=?"))
p1=Point(x,y)
print(p1)
dx=int(input("dx=?"))
dy=int(input("dy=?"))
p1.move(dx,dy)
print(p1)