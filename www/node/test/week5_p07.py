class Point:
    def __init__(self,x,y):
        self.x=x
        self.y=y
def mul(p, k):
    np=Point(p.x*k, p.y*k)
    return np
p1=Point(3,4)
for i in range(10):
    p2=mul(p1, i)
    print(p2.x, p2.y)
