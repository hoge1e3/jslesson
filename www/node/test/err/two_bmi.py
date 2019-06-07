Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:286:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
    at <anonymous>
# BMIを計算する関数を定義（ただし、判定結果付き）
def calc_bmi(weight, height):
    bmi = weight / (height / 100) ** 2
    res = "普通"
    if bmi < 18.5!!HERE!!: res = "痩せ型"
    if bmi >= 25: res = "肥満"
    return bmi, res # 二つの値を返す --- (*1)

# 関数を呼びだす --- (*2)
bmi, res = calc_bmi(weight = 80, height = 160)
print("BMI=" + str(bmi))
print("判定=" + res)


