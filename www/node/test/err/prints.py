Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:280:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
def a():
    print "---"
    
a()
print 3
a()
print 3,5
a()
print 3,
a()
print (3)
a!!HERE!!()
print (3,)  #tuple(only 2)  
a()
print (3,5) #tuple(only 2)  
a()
print (3,), #tuple(only 2, allowed also 3 but not tuple)
a()
print ((3,5)) #tuple(both)


