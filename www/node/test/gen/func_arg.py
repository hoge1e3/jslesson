from bawrapper import *

def calc35(f):
  return f( 3 , 5 )


print(calc35(lambda a,b:a + b))
print(calc35(lambda a,b:a * b))