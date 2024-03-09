from bawrapper import *
def profile(name,age):
  mesg="{} will be {} years old next year.".format(name,age +  1 )
  return mesg
print(profile("Yamada", 23 ))
print(profile("Tanaka", 30 ))
print(profile("Suzuki", 15 ))