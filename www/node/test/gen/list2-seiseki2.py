from bawrapper import *

p_list=[["田中", 30 , 50 , 80 ],["井上", 80 , 20 , 40 ],["鈴木", 80 , 30 , 40 ],["斉藤", 70 , 78 , 76 ]]

sub_list=["国語","算数","社会"]


for i in range( 3 ):
  k=i +  1 
  
  total= 0 
  for p in p_list:
    v=p[k]
    total=total + v
  
  ave=total / len(p_list)
  print(sub_list[i] + "=" + str(ave))
