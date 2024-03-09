class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
def sub_points(p1,p2):
    dx=p1.x-p2.x
    dy=p1.y-p2.y
    p=Point(dx,dy)
    return p
def dist1(p):
    return (p.x**2+p.y**2)**(1/2)
a=Point(-2,-5)
b=Point(3,-6)
c=Point(4,4)
d=Point(-5,1)
ab=sub_points(a,b)
bc=sub_points(b,c)
cd=sub_points(c,d)
da=sub_points(d,a)
print(ab.x, ab.y)
print(bc.x, bc.y)
print(cd.x, cd.y)
print(da.x, da.y)
