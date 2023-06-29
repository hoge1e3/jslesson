import bawrapper

url="http://weather.livedoor.com/forecast/webservice/json/v1"
url+="?city=130010"


import _urllib.request as req
res=req.urlopen(url)
json_data=res.read()


import json
data=json.loads(json_data)


for row in data["forecasts"]:
  label=row["dateLabel"]
  telop=row["telop"]
  print(label + " : " + telop)
