from bawrapper import *
def profile(name,age):
  mesg="{} will be {} years old next year.".format(name,age +  1 )
  return mesg
name=input("name=?")
age=int(input("age=?"))
print(profile(name,age))