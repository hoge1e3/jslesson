import bawrapper
import _numpy.random as rd
totalcount= 1000 
incount= 0 
for i in bawrapper._range(totalcount):
  x=rd.random()
  y=rd.random()
  if x **  2  + y **  2  <  1.0 :
    incount +=  1 
print( " 円周率 :" ,incount *  4.0  / totalcount)
