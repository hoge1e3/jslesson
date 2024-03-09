class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def mul(self):
        p=Point(self.x*2, self.y*2)
        return p
p1=Point(2,3)
p2=Point(4,5)
p3=p1.mul()
p4=p2.mul()
print(p3.x, p3.y)
print(p4.x, p4.y)
