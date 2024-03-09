from bawrapper import *
def rept(s,n):
  b=""
  for i in range(n):
    b+=s
  return b
def square(space,size):
  for i in range(size):
    print(rept(" ",space),end="")
    print(rept("*",size))
def triangle(n):
  for i in range(n):
    print(rept(" ",n - i -  1 ),end="")
    print(rept("*",i *  2  +  1 ))
def house(size):
  triangle(size)
  square( 1 ,size *  2  -  3 )
size=int(input("size=?"))
print("House size",size)
house(size)