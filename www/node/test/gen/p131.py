from bawrapper import *

def quicksort(a,start,end):
  m=int((start + end) /  2 )
  i=start
  j=end
  while (i < j):
    while a[i] < a[m]:
      i=i +  1 
    while a[j] > a[m]:
      j=j -  1 
    if i >= j:
      break
    temp=a[i]
    a[i]=a[j]
    a[j]=temp
    if i == m:
      m=j
    elif j == m:
      m=i
    i=i +  1 
    j=j -  1 
  if start < i -  1 :
    quicksort(a,start,m -  1 )
  if end > j +  1 :
    quicksort(a,m +  1 ,end)

a=[ 7 , 22 , 11 , 34 , 17 , 52 , 26 , 13 , 40 , 20 , 10 , 5 , 16 , 8 , 4 , 2 , 1 ]
print(" ソート前 ",a)
quicksort(a, 0 ,len(a) -  1 )
print(" ソート後 ",a)