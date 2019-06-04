import numpy as np # 整数をカウントするための関数呼び出し
import numpy.random as rd # 乱数を発生させる関数の呼び出し
saikoro = rd.randint(1, 6+1, 100) # サイコロを 100 回振る
print(saikoro) # 乱数の値を表示
deme = [ ] # 出目の数を数える配列
for i in range(6):
 deme.append(np.count_nonzero(saikoro==i+1)) # 出現回数を数えて配列に追加
print(" 出現数 :",deme) # 乱数の値を表示