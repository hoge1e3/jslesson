class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
def mul(p):
    np=Point(p.x*2, p.y*2)
    return np
p1=Point(3,4)
p2=Point(12,5)
p3=mul(p1)
p4=mul(p2)
print(p3.x, p3.y)
print(p4.x, p4.y)
