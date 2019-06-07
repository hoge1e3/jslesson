Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:286:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
    at <anonymous>
# 関数の定義 --- (*1)
def tasu(a, b):
    return a + b

# lambdaで関数の定義 --- (*2)
hiku !!HERE!!= lambda a, b: a - b

# 変数に関数を代入 -- (*3)
add = tasu
sub = hiku

# 変数に代入した関数を実行 --- (*4)
print( add(100, 10) )
print( sub(50, 5) )

