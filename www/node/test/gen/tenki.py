from bawrapper import *


def get_json(url):
  import _urllib.request as req
  import json
  
  res=req.urlopen(url)
  json_data=res.read()
  
  return json.loads(json_data)


def get_weather(city_id):
  url="http://weather.livedoor.com/forecast/webservice/json/v1"
  url+="?city=" + str(city_id)
  data=get_json(url)
  s=""
  for row in data["forecasts"]:
    label=row["dateLabel"]
    telop=row["telop"]
    s+=label + " : " + telop + "\n"
  return s


if __name__ == "__main__":
  res=get_weather( 130010 )
  print(res)
