# 今回集計するデータ --- (*1)
s = """
サンマ,カツオ,サンマ,サンマ,マグロ,フグ,マグロ,マグロ,マグロ,サンマ,ニシン,イワシ,サンマ,サンマ,カツオ,サンマ,カツオ,サンマ,カツオ,サンマ,マグロ,マグロ,マグロ,ニシン
"""

# データの前後にある空白を除去 --- (*2)
s = s.strip()
# カンマでデータを区切る --- (*3)
s_list = s.split(",")

# 集計用の辞書型を生成 --- (*4)
result = {}
for name in s_list:
    name = name.strip()
    # キー（name の値）がresult に存在するか確認
    if not name in result:
        result[name] = 0
    # 辞書型のnameのキーの値を1加算
    result[name] = result[name] + 1

# 結果を表示 --- (*5)
for name, v in result.items():
    print(name + " = " + str(v))
