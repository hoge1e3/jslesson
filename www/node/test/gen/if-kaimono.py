from bawrapper import *

total_str=input("買い物の合計金額は？")
total=int(total_str)

if total >=  5000 :
  total=int(total *  0.9 )
  print("- 1割引適用")

if total <  10000 :
  total=total +  1500 
  print("+ 送料1500円")
else:
  print("- 送料無料適用")

print("支払い金額は、" + str(total) + "円です")