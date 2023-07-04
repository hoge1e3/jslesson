import bawrapper
import _numpy as np
import _numpy.random as rd
import _matplotlib.pyplot as plt
saikoro=rd.randint( 1 , 6  +  1 , 100 )
deme=[]
for i in bawrapper._range( 6 ):
  deme.append(np.count_nonzero(saikoro == i +  1 ))
left=[ 1 , 2 , 3 , 4 , 5 , 6 ]
plt.title("SAIKORO SIMULATION")
plt.xlabel("ME")
plt.ylabel("KAISUU")
plt.bar(left,deme,align="center")
plt.show()