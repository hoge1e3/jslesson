import matplotlib.pyplot as plt # プロットオブジェクトをインポート
riritsu = 0.05 # 利率
yokin = [100000] # 預金配列の最初の値は 10 万
for i in range(10): #i の値を 0 〜 9 まで、10 回繰り返す
 risoku = int(yokin[i]*riritsu) # 利息は現在の預金額×利率 ( 整数化 )
 yokin.append(yokin[i]+risoku) # 配列に計算結果を追加
plt.title("FUKURI KEISAN") # グラフのタイトル
plt.xlabel("Year") #X 軸のラベル
plt.ylabel("Yokin[YEN]") #Y 軸のラベル
plt.plot(yokin, marker="o") # グラフをプロット
plt.show() # プロットオブジェクトを表示