import matplotlib.pyplot as p
import os

seq=0

def title(*a,**k):
    p.title(*a,**k)
def xlabel(*a,**k):
    p.xlabel(*a,**k)
def ylabel(*a,**k):
    p.ylabel(*a,**k)
def clf(*a,**k):
    p.clf(*a,**k)
def bar(*a,**k):
    p.bar(*a,**k)
def scatter(*a,**k):
    p.scatter(*a,**k)
def plot(*a,**k):
    p.plot(*a,**k)
def axis(*a,**k):
    p.axis(*a,**k)
def show():
    global seq
    seq+=1
    fn=os.getcwd()+'/figure'+str(seq)+'.png'
    p.savefig(fn)
    print("##PLOT##%s"%(fn))
