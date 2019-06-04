v = 0 # 合計値
i = 1 # 毎繰り返しごとに1を加算する
while i <= 10:
    print(str(v) + "+" + str(i) + "=" + str(v + i))
    v = v + i
    i = i + 1
print("---")
print("合計=" + str(v))

