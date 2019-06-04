# 天気予報を取得するモジュール
# URLからJSONデータをダウンロードする関数 --- (*1)
def get_json(url):
    import urllib.request as req
    import json
    # データをダウンロード
    res = req.urlopen(url)
    json_data = res.read()
    # JSONデータをPythonで扱えるよう読み込む
    return json.loads(json_data)

# 都市IDを取得することで天気情報を取得する関数 --- (*2)
def get_weather(city_id):
    url = "http://weather.livedoor.com/forecast/webservice/json/v1"
    url += "?city=" + str(city_id)
    data = get_json(url)
    s = ""
    for row in data["forecasts"]:
        label = row["dateLabel"]
        telop = row["telop"]
        s += label + " : " + telop + "\n"
    return s

# モジュールとして利用されるかどうか判定
if __name__ == "__main__":
    res = get_weather(130010) # 東京の天気を取得 --- (*3)
    print(res)

