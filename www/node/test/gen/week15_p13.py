from bawrapper import *
class Triangle:
  def __init__(self,a,b,c):
    self.a=a
    self.b=b
    self.c=c
    self.sort()
  def sort(self):
    if (self.a > self.b):
      temp=self.a
      self.a=self.b
      self.b=temp
    if (self.b > self.c):
      temp=self.b
      self.b=self.c
      self.c=temp
  def valid(self):
    if ((self.a + self.b) <= self.c):
      return  False 
    return  True 
  def __str__(self):
    msg="[a={}, b={}, c={}]".format(self.a,self.b,self.c)
    return msg
  def equilateral(self):
    if (self.a == self.b and self.b == self.c):
      return  True 
    return  False 
  def isosceles(self):
    if (self.a == self.b):
      return  True 
    if (self.b == self.c):
      return  True 
    if (self.c == self.a):
      return  True 
    return  False 
a=int(input("a=?"))
b=int(input("b=?"))
c=int(input("c=?"))
t=Triangle(a,b,c)
if (t.valid()):
  if (t.equilateral()):
    print("equilateral:",t)
  elif (t.isosceles()):
    print("isosceles:",t)
  else:
    print("normal:",t)
else:
  print("NOT a triangle: ",t)
