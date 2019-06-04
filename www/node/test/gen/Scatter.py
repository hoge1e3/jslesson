import bawrapper

import re
import _matplotlib.pyplot as plt

f=bawrapper._open( "class/scatter.txt" )
Xs=[]
Ys=[]
for line in f:
  line=re.sub( r'\n' , "" ,line)
  
  x,y=line.split( "\t" )
  
  plt.scatter(bawrapper._int(x),bawrapper._int(y))
  Xs.append(bawrapper._int(x))
  Ys.append(bawrapper._int(y))
f.close
plt.show()
plt.clf()

plt.plot(Xs,Ys)

plt.show()
