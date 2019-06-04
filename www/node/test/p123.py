import random #random モジュールを読み込む
a = 5
r = random.randrange(10) #0 ～ 9 までの整数をランダムに発生
print ("r=",r)
if a==r:
    print(" 当たり ")
elif a>r:
    print("a の方が大きい ")
elif a<r:
    print("a の方が小さい ")
    
