import math as math # 数値計算ライブラリ
import matplotlib.pyplot as plt # グラフ描画ライブラリ
dt = 0.01 # 微小時間 ( 時間間隔 )
v0 = 30 # 初速度
g = 9.8 # 重力加速度
x = [0] # 水平位置の初期値 0
y = [0] # 鉛直位置の初期値は 0
angle = 45.0 * math.pi / 180.0 # 投げ上げ角度
vx = [v0*math.cos(angle)] # 水平方向の初速度
vy = [v0*math.sin(angle)] # 鉛直方向の初速度
for i in range(1000):
 vx.append(vx[i]) # 微小時間後の水平方向の速度
 vy.append(vy[i]-g*dt) # 微小時間後の鉛直方向の速度
 x.append(x[i]+vx[i]*dt) # 微小時間後の水平位置
 y.append(y[i]+(vy[i]+vy[i+1])/2.0*dt) # 微小時間後の鉛直位置
 if y[i] < 0 : # もし鉛直位置が 0 を下回ったら
  break # ループ中断
plt.plot(x,y) # 位置の配列をプロット
plt.title("parabollic motion") # グラフのタイトル
plt.xlabel("distance") #x 軸ラベル
plt.ylabel("height") #y 軸ラベル
plt.show()