import numpy.random as rd # 乱数を発生させる関数の呼び出し
import matplotlib.pyplot as plt # グラフプロットの呼び出し
totalcount = 2000 # ランダムに打つ点の総数
incount = 0 # 円に入った点の数
for i in range(totalcount):
 x = rd.random() #0-1 の範囲の値
 y = rd.random() #0-1 の範囲の値
 if x**2 + y**2 < 1.0: # 単位円の中に入ったら
  incount += 1 # 入ったカウンターに１を加える
  plt.scatter(x, y, c="red") # 赤色でプロット
 else:
  plt.scatter(x, y, c="blue") # 青色でプロット
print(" 円周率 :", incount * 4.0 / totalcount) # 求まった円周率
plt.title("Monte Carlo method") # グラフのタイトル
plt.show()