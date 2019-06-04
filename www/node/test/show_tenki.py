# 東京の天気をJSONで取得できるURL --- (*1)
url = "http://weather.livedoor.com/forecast/webservice/json/v1"
url += "?city=130010"

# Webから天気情報を取得する --- (*2)
import urllib.request as req
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

