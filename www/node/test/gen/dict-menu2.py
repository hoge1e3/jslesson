import bawrapper

menu_dict={"洋風カレー": 900 ,"オムライス": 870 ,"ラザニア": 790 ,"ハンバーグ定食": 920 ,"トマトパスタ": 720 }

import math
for key,v1 in menu_dict.items():
  v2=math.ceil(v1 *  1.3 )
  print(key + " : " + bawrapper._str(v1) + "→" + bawrapper._str(v2) + "円")
