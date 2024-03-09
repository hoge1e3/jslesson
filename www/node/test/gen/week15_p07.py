from bawrapper import *
def chars(s,n):
  for i in range(n):
    print(s,end="")
  print()
def charTriangle(s,n):
  for i in range( 1 ,n +  1 ):
    chars(s,i)
chars("*", 10 )
charTriangle("A", 3 )
charTriangle("B", 5 )
charTriangle("C", 4 )