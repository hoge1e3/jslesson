import bawrapper
def binsearch(a,p):
  i= 0 
  j=bawrapper._len(a) -  1 
  while i <= j:
    m=bawrapper._int((i + j) /  2 )
    if a[m] == p:
      print (m, "番目に 見つかりました " )
      break
    else:
      if a[m] > p:
        j=m -  1 
      else:
        i=m +  1 

a=[ 25 , 33 , 43 , 51 , 66 , 71 , 88 ]
p= 43 
binsearch(a,p)
