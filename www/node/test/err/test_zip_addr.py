Error: zip_addr はインポートできません:2:7
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
# 郵便番号モジュールを取り込む
import !!HERE!!zip_addr
print(zip_addr.get_addr("110-0006"))


