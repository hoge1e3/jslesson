import math
class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def move(self, d):
        self.x+=d.x
        self.y+=d.y
    def __add__(self,d):
        x=self.x+d.x
        y=self.y+d.y
        return Point(x,y)
    def __str__(self):
        return "({},{})".format(self.x, self.y)
class Shape:
    def __init__(self, center):
        self.center=center
    def move(self, d):
        self.center.move(d)
class Circle(Shape):
    def __init__(self, center, radius):
        super().__init__(center)
        self.radius=radius
    def __str__(self):
        return "[Circle c={} r={}]".format(self.center, self.radius)
    def length(self):
        a=(self.radius*2)*math.pi
        return a
class Rectangle(Shape):
    def __init__(self, center, width, height):
        super().__init__(center)
        self.width=width
        self.height=height
    def __str__(self):
        return "[Rectangle c={} size={}x{}]".format(self.center, self.width, self.height)
    def length(self):
        a=(self.width+self.height)*2
        return a
p1=Point(3,4)
p2=Point(7,5)
s1=Rectangle(p1, 8, 6)
s2=Rectangle(p2, 10, 20)
print(s1, s1.length())
print(s2, s2.length())
s1=Circle(p1, 5)
s2=Circle(p2, 7)
print(s1, s1.length())
print(s2, s2.length())
