yokin = 100000 # 預金
riritsu = 0.05 # 利率
for i in range(10): #i の値を 0 から 9 まで 10 回繰り返す
 risoku = yokin*riritsu # その年の利息
 yokin = yokin + risoku # 預金に利息を加える
 print(i+1," 年目 :",yokin) # 画面に表示