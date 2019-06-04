Error: time はインポートできません:3:6
    at Object.v.error (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:346:19)
    at Object.importStmt (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:40:18)
    at Object.Visitor.$.visit (C:\bin\Dropbox\workspace\jslesson\www\js\lang\Visitor.js:12:20)
    at Object.program (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:34:18)
    at Object.Visitor.$.visit (C:\bin\Dropbox\workspace\jslesson\www\js\lang\Visitor.js:12:20)
    at v.newScope (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:358:26)
    at Object.enter (C:\bin\Dropbox\workspace\jslesson\www\js\lang\context.js:48:11)
    at Object.v.enter (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:318:29)
    at Object.v.newScope (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:329:25)
    at Object.check (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonSemantics.js:358:11)
# ライブラリを使うことを宣言 --- (*1)
import random
impor!!HERE!!t time

# 変数を初期化 --- (*2)
a = 0
b = 0
goal = 20
# ユーザーから入力を得る --- (*3)
user = input("aとbのどちらのカメが勝つか？")

# 競争開始 --- (*4)
print("競争開始！")
# aとbのどちらもゴールに達していない間繰り返す
while (a < goal) and (b < goal):
    print(" --- ")
    a = a + random.randint(1, 6)
    b = b + random.randint(1, 6)
    print("a:" + ">" * a + "@")
    print("b:" + ">" * b + "@")
    time.sleep(1)

# 勝利者判定 --- (*5)
if a == b:
    winner = "同時"
elif a > b:
    winner = "a"
else:
    winner = "b"
# 予想は当たった？
if winner == user:
    print("当たり！")
else:
    print("はずれ")

