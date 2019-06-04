import g

g.drawGrid()
for i in range(10):
    g.fillRect(i*20,30,10,50)
x=10
y=10

def move():
    global x,y
    g.clear()
    g.fillRect(x,y,50,50)
    if g.getkey("right"):
        x+=1
    if g.getkey("left"):
        x-=1
    if x<100:
        g.setTimeout(move,10)
    else:
        g.setTimeout(gov,10)
def gov():
    global x,y
    g.clear()
    g.fillRect(x,y,50,50)
    y+=10
    if y<300:
        g.setTimeout(gov,10)


g.setTimeout(move,10)
