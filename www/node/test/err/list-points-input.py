Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:280:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
# 点数を初期化 --- (*1)
points = []

# 繰り返し点数を入力する --- (*2)
while True:
    s = input("点数は? ")
    if (s == "") or (s == "q")!!HERE!!: break
    v = int(s)
    points.append(v) # --- (*3)

# 点数を集計する --- (*4)
total = 0
for v in points:
    total = total + v
print("合計点=" + str(total))
ave = total / len(points)
print("平均点=" + str(ave))


