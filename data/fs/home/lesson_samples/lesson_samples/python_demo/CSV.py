#1. 次のURLよりthermo.csvをダウンロードしてください：
# https://bitarrow.eplang.jp/bitarrow/fs/pub/f35f7858/thermo.csv
#2. ダウンロードしたファイルを
# 「ファイル」→「素材管理」→「user」を選んでアップロードしてください
#3.「実行」→「サーバで実行」を選んでください
import re
import matplotlib.pyplot as plt
import datetime as d
import numpy as np
import matplotlib.dates as mdates

fig, sb=plt.subplots()
Xs=[]
Ys=[]
f=open ("user/thermo.csv")
for line in f:
    line=re.sub(r'\n',"",line)    
    x,y=line.split(",")
    Xs.append(d.datetime.fromtimestamp(int(x)))
    Ys.append(float(y))
f.close

sb.xaxis.set_major_locator(mdates.DayLocator(bymonthday=None, interval=14, tz=None))
sb.xaxis.set_major_formatter(mdates.DateFormatter("%Y-%m-%d"))

sb.plot(Xs, Ys,color="blue")
plt.show()

