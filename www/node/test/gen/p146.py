import bawrapper
import _matplotlib.pyplot as plt
zouka= 0.01 
capacity= 1000 
n=[ 10 ]
for i in bawrapper._range( 1000 ):
  zoukasuu=n[i] * zouka
  gensyousuu=n[i] * (n[i] / capacity) * zouka
  n.append(n[i] + (zoukasuu - gensyousuu))
plt.plot(n)
plt.title( "number of life" )
plt.xlabel( "time" )
plt.ylabel( "number" )
plt.show()
