from bawrapper import *
import _numpy as np
import _numpy.random as rd
saikoro=rd.randint( 1 , 6  +  1 , 100 )
print(saikoro)
deme=[]
for i in range( 6 ):
  deme.append(np.count_nonzero(saikoro == i +  1 ))
print(" 出現数 :",deme)