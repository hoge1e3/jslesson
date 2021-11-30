from urllib import request
import requests
import json

def get(key):
    url='https://cdb.eplang.jp/api/get?key='+key
    response=request.urlopen(url)
    html = response.read().decode("utf-8")
    response.close()
    res=json.loads(html)
    return res
def post(key, data):
    url='https://cdb.eplang.jp/api/post?key='+key
    response=requests.post(url, json=data)
    return response.text
