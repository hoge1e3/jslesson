#「実行」→「ブラウザで実行」を選んでください
import g
import random
class Actor:
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def crashTo(self,a):
        return abs(self.x-a.x)<20 and abs(self.y-a.y)<20
class Player(Actor):
    def draw(self):
        g.setColor(0,0,255)
        g.fillOval(self.x,self.y,20,20)
    def move(self):
        if g.getkey("Right"):
            self.x+=3
        if g.getkey("Left"):
            self.x-=3
class Enemy(Actor):
    def __init__(self,x,y,vy):
        super().__init__(x,y)
        self.vy=vy
    def draw(self):
        g.setColor(255,0,0)
        g.fillRect(self.x,self.y,20,20)
    def move(self):
        self.y+=self.vy
        if self.y>330:
            self.y=0
            self.x=random.randint(0,300)
        if self.crashTo(pl):
            pl.x=10
pl=Player(100,300)
enemies=[]
for i in range(10):
    x=random.randint(0,300)
    y=random.randint(0,100)
    vy=random.randint(1,3)
    enemies.append(Enemy(x,y,vy))

def move():
    g.clear()
    pl.draw()
    pl.move()
    for en in enemies:
        en.draw()
        en.move()
    g.setTimeout(move,16)
move()


    