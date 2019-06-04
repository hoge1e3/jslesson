import matplotlib.pyplot as plt # グラフ描画ライブラリ
zouka = 0.01 # 増加率
capacity = 1000 # 環境収容数
n = [10] # 最初の個体数
for i in range(1000):
 zoukasuu = n[i]*zouka # 増加数
 gensyousuu = n[i]*(n[i]/capacity)*zouka # 減少数
 n.append(n[i]+(zoukasuu - gensyousuu)) # 個体数
plt.plot(n) # グラフにプロット
plt.title("number of life") # グラフのタイトル
plt.xlabel("time") #x 軸のラベル
plt.ylabel("number") #y 軸のラベル
plt.show()