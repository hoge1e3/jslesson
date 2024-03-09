from bawrapper import *
def chars(n):
  for i in range(n):
    print("+",end="")
  print()
def charTriangle(n):
  for i in range(n):
    chars(n - i)
chars( 10 )
charTriangle( 3 )
charTriangle( 5 )
charTriangle( 4 )