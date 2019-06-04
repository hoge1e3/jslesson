Error: 文法エラー
    at Grammar.g.parse (C:\bin\Dropbox\workspace\jslesson\www\js\build\python\PythonParser.js:280:21)
    at testHome.each.pySrcF (C:\bin\Dropbox\workspace\jslesson\www\node\testall.js:21:27)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:735:39
    at Object.loop (C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:756:28)
    at C:\bin\Dropbox\workspace\jslesson\www\js\fs2\FS.js:761:46
# coding: utf-8
# Your code here!



#x,=3  TypeError: 'int' object is not iterable
#print !!HERE!!(x)
x=3,
print (x)
x,=3,
print (x)

x=3,5
print (x)
x=3,5,
print (x)
x=(3,5)
print (x)
(x)=3,5
print (x)
#(x,)=3,5 ValueError: too many values to unpack
#print (x)
x,y=3,5
print (x,y)
x,y=3,5,
print (x,y)
x,y,=3,5
print (x,y)
x,y,=3,5,
print (x,y)


(x,y)=3,5
print (x,y)
(x,y)=(3,5,)
print (x,y)
x,y,=(3,5)
print (x,y)
(x,y,)=3,5,
print (x,y)

