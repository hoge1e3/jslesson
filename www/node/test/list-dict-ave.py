# あるクラスのテスト結果
test_list = [
  { "名前": "田中", "国語": 80, "算数": 45, "社会": 90 },
  { "名前": "鈴川", "国語": 62, "算数": 70, "社会": 58 },
  { "名前": "早川", "国語": 77, "算数": 69, "社会": 74 }
]
# 国語の平均点を求める
total = 0
for p in test_list:
    total = total + p["国語"]
ave = total / len(test_list)
print(ave)

