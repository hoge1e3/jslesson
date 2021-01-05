import matplotlib.pyplot as p
import os

seq=0

def title(*a,**k):
    return p.title(*a,**k)
def xlabel(*a,**k):
    return p.xlabel(*a,**k)
def ylabel(*a,**k):
    return p.ylabel(*a,**k)
def xticks(*a,**k):
    return p.xticks(*a,**k)
def yticks(*a,**k):
    return p.yticks(*a,**k)
def clf(*a,**k):
    return p.clf(*a,**k)
def bar(*a,**k):
    return p.bar(*a,**k)
def scatter(*a,**k):
    return p.scatter(*a,**k)
def plot(*a,**k):
    return p.plot(*a,**k)
subplots=p.subplots
subplot=p.subplot
#def subplots(*a,**k):
#    return p.subplots(*a,**k)
def axis(*a,**k):
    return p.axis(*a,**k)
def show():
    global seq
    seq+=1
    fn=os.getcwd()+'/figure'+str(seq)+'.png'
    p.savefig(fn)
    p.clf()
    print("##PLOT##%s"%(fn))
hist=p.hist
pcolor=p.pcolor
grid=p.grid
subplots=p.subplots
cla=p.cla
legend=p.legend
tight_layout=p.tight_layout
figure=p.figure
pcolormesh=p.pcolormesh
# p.figure().add_subplot...
#add_subplot=p.add_subplot
#pcolorfast=p.pcolorfast

#imshow=p.imshow
