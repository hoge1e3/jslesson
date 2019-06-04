import random

# 変数の初期化 --- (*1)
win = 0 # 勝った回数
draw = 0 # 引分の回数

# 3回勝負 --- (*2)
for i in range(3):
    print("■じゃんけん" + str(i + 1) + "回目")
    print("> 0:グー、1:チョキ、2:パー")
    # コンピュータの手を決定 --- (*3)
    com = random.randint(0, 2)
    # 自分の手を入力 --- (*4)
    you = int(input("あなたの手は? "))
    # 結果を表示 --- (*5)
    print("コンピュータの手=" + str(com))
    # じゃんけんの結果を判定 --- (*6)
    n = (com - you + 3) % 3
    if n == 0:
        print("→あいこ")
        draw = draw + 1
    elif n == 1:
        print("→勝ち (^v^)y")
        win = win + 1
    else:
        print("→負け (ToT)m")
    print("---")

# 最終的な対戦結果の表示 --- (*7)
print("結果=3戦" + str(win) + "勝" + str(draw) + "引分")

