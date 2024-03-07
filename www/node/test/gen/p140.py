from bawrapper import *
import _numpy.random as rd
import _matplotlib.pyplot as plt
totalcount= 2000 
incount= 0 
for i in range(totalcount):
  x=rd.random()
  y=rd.random()
  if x **  2  + y **  2  <  1.0 :
    incount+= 1 
    plt.scatter(x,y,c="red")
  else:
    plt.scatter(x,y,c="blue")
print(" 円周率 :",incount *  4.0  / totalcount)
plt.title("Monte Carlo method")
plt.show()