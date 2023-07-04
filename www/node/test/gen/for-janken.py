import bawrapper
import random


win= 0 
draw= 0 


for i in bawrapper._range( 3 ):
  print("■じゃんけん" + bawrapper._str(i +  1 ) + "回目")
  print("> 0:グー、1:チョキ、2:パー")
  
  com=random.randint( 0 , 2 )
  
  you=bawrapper._int(bawrapper._input("あなたの手は? "))
  
  print("コンピュータの手=" + bawrapper._str(com))
  
  n=(com - you +  3 ) %  3 
  if n ==  0 :
    print("→あいこ")
    draw=draw +  1 
  elif n ==  1 :
    print("→勝ち (^v^)y")
    win=win +  1 
  else:
    print("→負け (ToT)m")
  print("---")


print("結果=3戦" + bawrapper._str(win) + "勝" + bawrapper._str(draw) + "引分")