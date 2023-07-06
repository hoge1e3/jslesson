from bawrapper import *

import re
import _matplotlib.pyplot as plt

f=open("class/scatter.txt")
Xs=[]
Ys=[]
for line in f:
  line=re.sub(r'\n',"",line)
  
  x,y=line.split("\t")
  
  plt.scatter(int(x),int(y))
  Xs.append(int(x))
  Ys.append(int(y))
f.close
plt.show()
plt.clf()

plt.plot(Xs,Ys)

plt.show()