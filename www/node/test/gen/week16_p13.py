from bawrapper import *
class Point:
  def __init__(self,x,y):
    self.x=x
    self.y=y
  def __str__(self):
    return "({},{})".format(self.x,self.y)
  def dist(self,p):
    return ((p.x - self.x) **  2  + (p.y - self.y) **  2 ) **  0.5 
class Triangle:
  def __init__(self,a,b,c):
    self.a=a
    self.b=b
    self.c=c
  def ab(self):
    return self.a.dist(self.b)
  def bc(self):
    return self.b.dist(self.c)
  def ca(self):
    return self.c.dist(self.a)
  def __str__(self):
    msg="[a={}, b={}, c={}]".format(self.a,self.b,self.c)
    return msg
  def isosceles(self):
    if (self.ab() == self.bc()):
      return  True 
    if (self.bc() == self.ca()):
      return  True 
    if (self.ca() == self.ab()):
      return  True 
    return  False 
ax=int(input("ax=?"))
ay=int(input("ay=?"))
a=Point(ax,ay)
bx=int(input("bx=?"))
by=int(input("by=?"))
b=Point(bx,by)
cx=int(input("cx=?"))
cy=int(input("cy=?"))
c=Point(cx,cy)
t=Triangle(a,b,c)
if (t.isosceles()):
  print("isosceles:",t)
else:
  print("not isosceles:",t)
