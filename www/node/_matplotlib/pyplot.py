import matplotlib.pyplot as p
import os

def title(*a,**k):
    p.title(*a,**k)
def xlabel(*a,**k):
    p.xlabel(*a,**k)
def ylabel(*a,**k):
    p.ylabel(*a,**k)
def bar(*a,**k):
    p.bar(*a,**k)
def show():
    fn=os.getcwd()+'/figure.png'
    p.savefig(fn)
    print("##PLOT##%s"%(fn))
