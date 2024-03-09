from bawrapper import *
def grade(s):
  if s >=  90 :
    return "S"
  elif s >=  80 :
    return "A"
  elif s >=  70 :
    return "B"
  elif s >=  60 :
    return "C"
  else:
    return "F"
name=input("name=?")
score=int(input("score=?"))
print(name,"'s score is ",score)
print(name,"'s grade is ",grade(score))