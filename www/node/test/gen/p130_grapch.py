import bawrapper
import _numpy as np
import _numpy.random as rd
import _matplotlib.pyplot as plt

swc= 0 
def selectionsort(a):
  global swc
  for i in bawrapper._range( 0 ,bawrapper._len(a), 1 ):
    for j in bawrapper._range(i +  1 ,bawrapper._len(a), 1 ):
      if a[j] < a[i]:
        swc +=  1 
        temp=a[i]
        a[i]=a[j]
        a[j]=temp



for n in bawrapper._range( 5 , 15 ):
  a=rd.randint( 1 , 100 ,n)
  print ( " ソート前 " ,a)
  selectionsort(a)
  print ( " ソート後 " ,a)
  print ( "並び替え " ,swc)
  plt.scatter(n,swc,color= "blue" )
  
plt.show()
