import bawrapper

menu_dict={"洋風カレー": 900 ,"オムライス": 870 ,"ラザニア": 790 ,"ハンバーグ定食": 920 ,"トマトパスタ": 720 }


import math
for key in menu_dict:
  v1=menu_dict[key]
  v2=math.ceil(v1 *  1.3 )
  print(key + " : " + bawrapper._str(v1) + "→" + bawrapper._str(v2) + "円")
