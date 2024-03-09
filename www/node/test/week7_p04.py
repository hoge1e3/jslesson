class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def multiply(self, k):
        self.x*=k
        self.y*=k
    def multiplied(self, k):
        x=self.x*k
        y=self.y*k
        p=Point(x,y)
        return p
    def __str__(self):
        return "({},{})".format(self.x, self.y)
p1=Point(2,3)
p2=Point(4,5)
print("p1=",p1)
print("p2=",p2)
p1.multiply(10)
p3=p2.multiplied(10)
print("p1=",p1)
print("p2=",p2)
print("p3=",p3)
p3.multiply(2)
p4=p1.multiplied(2)
print("p1=",p1)
print("p2=",p2)
print("p3=",p3)
print("p4=",p4)
