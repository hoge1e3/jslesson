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
class Rectangle:
    def __init__(self, center, width, height):
        self.center=center
        self.width=width
        self.height=height
    def __str__(self):
        return "[Rectangle c={} size={}x{}]".format(self.center, self.width, self.height)
    def moved(self, d):
        r=Rectangle(self.center+d, self.width, self.height)
        return r
    def size_changed(self, width, height):
        r=Rectangle(self.center, width, height)
        return r
r1=Rectangle(Point(5,8), 10,6)
print("r1=",r1)
r2=r1.size_changed(6,10)
print("r1=",r1)
print("r2=",r2)
r3=r2.size_changed(16,16)
print("r1=",r1)
print("r2=",r2)
print("r3=",r3)
