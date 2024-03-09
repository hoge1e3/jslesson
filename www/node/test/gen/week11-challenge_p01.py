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
  def area(self):
    a=self.ab()
    b=self.bc()
    c=self.ca()
    s=(a + b + c) /  2 
    return (s * (s - a) * (s - b) * (s - c)) **  0.5 
  def __str__(self):
    return "[Triangle {} {} {}]".format(self.a,self.b,self.c)
p0=Point( 0 , 0 )
p1=Point( 3 , 0 )
p2=Point( 0 , 4 )
p3=Point( 3 , 6 )
p4=Point( 2 , 3 )
t1=Triangle(p0,p1,p2)
t2=Triangle(p1,p2,p3)
t3=Triangle(p2,p3,p4)
print(t1)
print(t1.ab(),t1.bc(),t1.ca())
print(t1.area())
print(t2)
print(t2.ab(),t2.bc(),t2.ca())
print(t2.area())
print(t3)
print(t3.ab(),t3.bc(),t3.ca())
print(t3.area())