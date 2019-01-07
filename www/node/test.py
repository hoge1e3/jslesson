# Python
# coding: utf-8
# バイバイン: 某猫型ロボットのひみつ道具．1滴ふりかけると，その物体が5分ごとに2倍になる
import jp

numOfDorayaki = 1
min = 60

def baibain(n,min):
    if(min<=0):
        return n
    else:
        return baibain(2*n,min-5)

print '1個のどら焼きが，',str(min),'分後には・・・',
print(baibain(numOfDorayaki,min)),
print('個!')
