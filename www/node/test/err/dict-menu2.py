Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:280:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
# レストランのメニュー
menu_dict = {"洋風カレー": 900, "オムライス": 870, "ラザニア": 790,
    "ハンバーグ定食": 920, "トマトパスタ": 720}
# 全ての料理の値段を1.3倍する
import math
for !!HERE!!key, v1 in menu_dict.items():
    v2 = math.ceil(v1 * 1.3)
    print(key + " : " + str(v1) + "→" + str(v2) + "円")


