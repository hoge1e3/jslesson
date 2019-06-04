Error: urllib はインポートできません:6:3
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
# 東京の天気をJSONで取得できるURL --- (*1)
url = "http://weather.livedoor.com/forecast/webservice/json/v1"
url += "?city=130010"

# Webから天気情報を取得する --- (*2)
im!!HERE!!port urllib.request as req
res = req.urlopen(url)
json_data = res.read()

# JSONデータをPythonのデータ型に変換 --- (*3)
import json
data = json.loads(json_data)

# 結果を表示 --- (*4)
for row in data["forecasts"]:
    label = row["dateLabel"]
    telop = row["telop"]
    print(label + " : " + telop)

