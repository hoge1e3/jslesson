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
r2=Rectangle(Point(15,11), 8,2)
print(r1.xmin(), r1.xmax(), r1.ymin(), r1.ymax() )
print(r2.xmin(), r2.xmax(), r2.ymin(), r2.ymax() )
