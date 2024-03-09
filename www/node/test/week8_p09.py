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
class Circle:
    def __init__(self, center, radius):
        self.center=center
        self.radius=radius
    def move(self, d):
        self.center.move(d)
    def moved(self, d):
        c=Circle(self.center+d, self.radius)
        return c
p=Point(3,4)
c1=Circle(p, 5)
print(c1.radius)
print(c1.center)
c2=c1.moved(Point(10,10))
print(c1.radius)
print(c1.center)
print(c2.radius)
print(c2.center)
