import bawrapper

test_list=[{"名前":"田中","国語": 80 ,"算数": 45 ,"社会": 90 },{"名前":"鈴川","国語": 62 ,"算数": 70 ,"社会": 58 },{"名前":"早川","国語": 77 ,"算数": 69 ,"社会": 74 }]


for p in test_list:
  p["合計"]=p["国語"] + p["算数"] + p["社会"]


test_list=bawrapper._sorted(test_list,key=lambda v:v["合計"],reverse= True )


for p in test_list:
  print(p["名前"] + ":" + bawrapper._str(p["合計"]))
