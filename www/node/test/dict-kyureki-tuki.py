# 旧暦の各月の名前
kyureki = {
    "睦月": 1, "如月": 2, "弥生": 3, "卯月": 4, 
    "皐": 5, "水無月": 6, "文月": 7, "葉月": 8,
    "長月": 9, "神無月": 10, "霜月": 11, "師走": 12
}

# 繰り返しユーザーに尋ねる
while True:
    tuki = input("旧暦の月名を入力> ")
    if tuki == "" or tuki == "q": break
    if tuki in kyureki:
        print(str(kyureki[tuki]) + "月です")
    else:
        print("ありません")

