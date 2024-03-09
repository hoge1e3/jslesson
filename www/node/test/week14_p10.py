class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def __str__(self):
        return "({},{})".format(self.x, self.y)
    def dist(self, p):
        return ((p.x-self.x)**2 +(p.y-self.y)**2)**0.5
points=[]
points.append(Point(3,4))
points.append(Point(7,7))
points.append(Point(2,4))
points.append(Point(5,8))
for p in points:
    print(p)
p0=Point(10,10)
for p in points:
    print("distance from {} to {}: {} ".format(p0, p, p.dist(p0)) )
