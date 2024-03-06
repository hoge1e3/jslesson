from bawrapper import *

def tasu(a,b):
  return a + b


hiku=lambda a,b:a - b


add=tasu
sub=hiku


print(add( 100 , 10 ))
print(sub( 50 , 5 ))