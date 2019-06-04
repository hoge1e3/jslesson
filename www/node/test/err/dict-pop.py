Error: 字句エラー 2:7
    at Tokenizer.error (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:116:21)
    at Tokenizer.tokenizeLine (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:123:40)
    at Tokenizer.tokenize (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:100:32)
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:267:19)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
# 今回集計するデータ --- (*1)
!!HERE!!s = """
サンマ,カツオ,サンマ,サンマ,マグロ,フグ,マグロ,マグロ,マグロ,サンマ,ニシン,イワシ,サンマ,サンマ,カツオ,サンマ,カツオ,サンマ,カツオ,サンマ,マグロ,マグロ,マグロ,ニシン
"""

# データの前後にある空白を除去 --- (*2)
s = s.strip()
# カンマでデータを区切る --- (*3)
s_list = s.split(",")

# 集計用の辞書型を生成 --- (*4)
result = {}
for name in s_list:
    name = name.strip()
    # キー（name の値）がresult に存在するか確認
    if not name in result:
        result[name] = 0
    # 辞書型のnameのキーの値を1加算
    result[name] = result[name] + 1

# 結果を表示 --- (*5)
for name, v in result.items():
    print(name + " = " + str(v))
