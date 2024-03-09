from bawrapper import *
class Plus10:
  def __init__(self,value):
    self.value=value
  def __add__(self,other):
    return (self.value + other.value +  10 )
x=Plus10( 1 )
y=Plus10( 2 )
print(x + y)
x=Plus10( -  1 )
y=Plus10( -  20 )
print(x + y)
x=Plus10( -  5 )
y=Plus10( 30 )
print(x + y)