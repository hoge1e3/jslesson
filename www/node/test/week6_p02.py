class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def dist1(self):
        return (self.x**2+self.y**2)**(1/2)
p1=Point(3,4)
p2=Point(12,5)
print(p1.dist1())
print(p2.dist1())
