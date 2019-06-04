Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:280:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at Object.each (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:733:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:2859:23
# 消費カロリーを計算して表示する関数 --- (*1)
def show_calorie(min, !!HERE!!weight = 50):
    kcal = weight * 2 * (min / 60) * 1.05
    msg = "体重{0}kgの人が{1}分歩くと{2}kcal消費"
    s = msg.format(weight, min, kcal)
    print(s)

# 関数を呼ぶ
show_calorie(30, weight = 60) # --- (*2)
show_calorie(30, weight = 60)
show_calorie(30) # --- (*3)
show_calorie(60)




