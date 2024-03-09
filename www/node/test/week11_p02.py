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
r1=Rectangle(Point(10,10), 4,6)
r2=Rectangle(Point(15,11), 8,2)
print(r1.center.x - r1.width/2)
print(r2.center.x - r2.width/2)
