Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:286:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
    at <anonymous>
# あるクラスのテスト結果
test_list = [
  { "名前": "田中", "国語": 80, "算数": 45, "社会": 90 },
  { "名前": "鈴川", "国語": 62, "算数": 70, "社会": 58 },
  { "名前": "早川", "国語": 77, "算数": 69, "社会": 74 }
]

# 各生徒について合計点を求める --- (*1)
for p in test_list:
    p["合計"] = p["国語"] + p["算数"] + p["社会"]

# 合計点で生徒を並び替える --- (*2)
test_list = sorted(test_list,
        key!!HERE!!=lambda v: v["合計"], 
        reverse=True)

# 結果を表示
for p in test_list:
    print(p["名前"] + ":" + str(p["合計"]))
