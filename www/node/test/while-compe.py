# ライブラリを使うことを宣言 --- (*1)
import random
import time

# 変数を初期化 --- (*2)
a = 0
b = 0
goal = 20
# ユーザーから入力を得る --- (*3)
user = input("aとbのどちらのカメが勝つか？")

# 競争開始 --- (*4)
print("競争開始！")
# aとbのどちらもゴールに達していない間繰り返す
while (a < goal) and (b < goal):
    print(" --- ")
    a = a + random.randint(1, 6)
    b = b + random.randint(1, 6)
    print("a:" + ">" * a + "@")
    print("b:" + ">" * b + "@")
    time.sleep(1)

# 勝利者判定 --- (*5)
if a == b:
    winner = "同時"
elif a > b:
    winner = "a"
else:
    winner = "b"
# 予想は当たった？
if winner == user:
    print("当たり！")
else:
    print("はずれ")

