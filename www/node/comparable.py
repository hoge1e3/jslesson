import json
import sys

# JSONファイルの読み込み
with open(sys.argv[1], 'r', encoding="utf8") as file:
    data = json.load(file)

# キーを辞書順にソート
sorted_keys = sorted(data.keys())

# キーと値の表示
for key in sorted_keys:
    value = data[key]
    print(f'[{key}]\n{value}\n')