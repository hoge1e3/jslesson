import bawrapper
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



a=[ 7 , 22 , 11 , 34 , 17 , 52 , 26 , 13 , 40 , 20 , 10 , 5 , 16 , 8 , 4 , 2 , 1 ]

print ( " ソート前 " ,a)
selectionsort(a)
print ( " ソート後 " ,a)
