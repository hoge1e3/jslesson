#「実行」→「サーバで実行」を選んでください
import numpy as np # 整数をカウントするための関数呼び出し
import numpy.random as rd # 乱数を発生させる関数の呼び出し
import matplotlib.pyplot as plt # グラフプロットの呼び出し
saikoro = rd.randint(1, 6+1, 100) # サイコロを 100 回振る
deme = [ ] # 出目の数を数える配列
for i in range(6):
   deme.append(np.count_nonzero(saikoro==i+1)) # 数を数えて配列に追加
left = [1, 2, 3, 4, 5, 6] # グラフの左方向の値指定用
plt.title("SAIKORO SIMULATION") # グラフのタイトル
plt.xlabel("ME") #X 軸のラベル
plt.ylabel("KAISUU") #Y 軸のラベル
plt.bar(left, deme, align="center") # グラフをプロット
plt.show() # プロットオブジェクトを表示