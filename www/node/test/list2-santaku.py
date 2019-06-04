# 三択クイズ
# クイズデータを二次元のリストで表現 --- (*1)
quiz_list = [
    # [問題, 選択肢1, 選択肢2, 選択肢3, 答え]
    ["夏目漱石の本名は？", "石男", "浩介", "金之助", 3],
    ["野口英世が亡くなった場所は？", "福島", "ガーナ", "パリ", 2],
    ["福澤諭吉が広めたものは？", "カレー", "電灯", "天ぷら", 1],
    ["樋口一葉が書いた小説は？", "双葉", "十三夜", "歌世界", 2]
]

# 問題をシャッフル --- (*2)
import random
random.shuffle(quiz_list)

# 繰り返し出題する --- (*3)
for quiz in quiz_list:
    print("[問題]")
    print(quiz[0])
    # 選択肢を表示 --- (*4)
    for i in range(3):
        no = i + 1
        print(str(no) + ": " + quiz[no])
    # ユーザーに質問する --- (*5)
    user = int(input("答えは? "))
    # 答え合わせ --- (*6)
    ans = quiz[4]
    if user == ans:
        print("正解！")
    else:
        print("ハズレ ... 答えは " + quiz[ans])
    print(" --- ")

