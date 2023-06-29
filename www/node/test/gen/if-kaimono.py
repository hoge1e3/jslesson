import bawrapper

total_str=bawrapper._input("買い物の合計金額は？")
total=bawrapper._int(total_str)

if total >=  5000 :
  total=bawrapper._int(total *  0.9 )
  print("- 1割引適用")

if total <  10000 :
  total=total +  1500 
  print("+ 送料1500円")
else:
  print("- 送料無料適用")

print("支払い金額は、" + bawrapper._str(total) + "円です")