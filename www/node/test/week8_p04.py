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
p1=Point(3,4)
p2=Point(1,2)
print("p1=",p1)
print("p2=",p2)
p3=p1+p2
print("p1=",p1)
print("p2=",p2)
print("p3=",p3)
