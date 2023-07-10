from bawrapper import *

yubin_api="http://api.aoikujira.com/zip/json/"


def get_json(url):
  import _urllib.request as req,json
  res=req.urlopen(url)
  json_data=res.read()
  return json.loads(json_data)


def get_addr(zip_code):
  url=yubin_api + zip_code
  a=get_json(url)
  return a["state"] + a["city"] + a["address"]
  

if __name__ == "__main__":
  print(get_addr("110-0006"))
