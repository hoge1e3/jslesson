from bawrapper import *
class Prism:
  def __init__(self,length):
    self.length=length
  def volume(self,area):
    return area * self.length
class Cuboid:
  def __init__(self,width,height,length):
    self.width=width
    self.height=height
    super().__init__(length)
  def area(self):
    return self.width * self.height
  def volume(self):
    return super().volume(self.area())
class TriangularPrism:
  def __init__(self,width,height,length):
    self.width=width
    self.height=height
    super().__init__(length)
  def area(self):
    return self.width * self.height /  2 
  def volume(self):
    return super().volume(self.area())
cub=Cuboid( 3 , 4 , 5 )
print(cub.area())
print(cub.volume())
tri=TriangularPrism( 3 , 4 , 5 )
print(tri.area())
print(tri.volume())