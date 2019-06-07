Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:286:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
    at <anonymous>
i = 0 
while i < 5:
    i = i + 1 
    print("--> " + str(i))
    if i % 2 == 0!!HERE!!: continue # --- (*1)
    print("<-- " + str(i))

