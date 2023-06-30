import bawrapper
print("インチからセンチへの変換")
print("プログラムを終わるには,[Ctrl]+[C]キーを押します。")
c= 0 
while c <  10 :
  print(" --- ")
  inch=bawrapper._float(bawrapper._input("インチは？"))
  cm=inch *  2.54 
  print(bawrapper._str(cm) + "センチです")
  c+= 1 
