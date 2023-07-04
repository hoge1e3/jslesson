import bawrapper
i= 0 
while i <  5 :
  i=i +  1 
  print("--> " + bawrapper._str(i))
  if i %  2  ==  0 :
    continue
  print("<-- " + bawrapper._str(i))
