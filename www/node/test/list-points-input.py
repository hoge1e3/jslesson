# 点数を初期化 --- (*1)
points = []

# 繰り返し点数を入力する --- (*2)
while True:
    s = input("点数は? ")
    if (s == "") or (s == "q"): break
    v = int(s)
    points.append(v) # --- (*3)

# 点数を集計する --- (*4)
total = 0
for v in points:
    total = total + v
print("合計点=" + str(total))
ave = total / len(points)
print("平均点=" + str(ave))


