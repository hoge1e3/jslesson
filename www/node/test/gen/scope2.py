import bawrapper
value= 30 

def hoge1():
  print(value)

def hoge2():
  value= 999 
  print(value)

hoge1()
hoge2()
print(value)