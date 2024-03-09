class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def __str__(self):
        return "({},{})".format(self.x, self.y)
    def dist(self, p):
        return ((p.x-self.x)**2 +(p.y-self.y)**2)**0.5
p1=Point(10,10)
p2=Point(13,14)
p3=Point(13,10)
print(p1.dist(p2))
print(p2.dist(p3))
print(p3.dist(p1))
