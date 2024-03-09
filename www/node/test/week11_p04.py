class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def __str__(self):
        return "({},{})".format(self.x, self.y)
class Rectangle:
    def __init__(self, center, width, height):
        self.center=center
        self.width=width
        self.height=height
    def __str__(self):
        return "[Rectangle c={} size={}x{}]".format(self.center, self.width, self.height)
    def xmin(self):
        return self.center.x-self.width/2
    def xmax(self):
        return self.center.x+self.width/2
    def ymin(self):
        return self.center.y-self.height/2
    def ymax(self):
        return self.center.y+self.height/2
r1=Rectangle(Point(10,10), 4,6)
x=int(input("x=?"))
y=int(input("y=?"))
p=Point(x,y)
if p.x>=r1.xmin() and p.x<=r1.xmax() and p.y>=r1.ymin() and p.y<=r1.ymax():
    print(p, "in", r1)
else:
    print(p, "not in", r1)
