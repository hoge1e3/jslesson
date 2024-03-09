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
    def contains(self, p):
            if p.x>=self.xmin() and p.x<=self.xmax() and p.y>=self.ymin() and p.y<=self.ymax():
                return True
            else:
                return False
r1=Rectangle(Point(10,10), 4,6)
r2=Rectangle(Point(15,11), 8,2)
p1=Point(17,9)
p2=Point(8,12)
p3=Point(13,12)
p4=Point(12,12)
print("p1 in r1:", r1.contains(p1))
print("p2 in r1:", r1.contains(p2))
print("p3 in r1:", r1.contains(p3))
print("p4 in r1:", r1.contains(p4))
print("p1 in r2:", r2.contains(p1))
print("p2 in r2:", r2.contains(p2))
print("p3 in r2:", r2.contains(p3))
print("p4 in r2:", r2.contains(p4))
