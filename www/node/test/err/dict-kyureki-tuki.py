Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:280:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
# 旧暦の各月の名前
kyureki = {
    "睦月": 1, "如月": 2, "弥生": 3, "卯月": 4, 
    "皐": 5, "水無月": 6, "文月": 7, "葉月": 8,
    "長月": 9, "神無月": 10, "霜月": 11, "師走": 12
}

# 繰り返しユーザーに尋ねる
while True:
    tuki = input("旧暦の月名を入力> ")
    if tuki == "" or tuki == "q"!!HERE!!: break
    if tuki in kyureki:
        print(str(kyureki[tuki]) + "月です")
    else:
        print("ありません")

