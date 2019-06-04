# 成績表のデータ --- (*1)
p_list = [
    ["田中", 30, 50, 80],
    ["井上", 80, 20, 40],
    ["鈴木", 80, 30, 40],
    ["斉藤", 70, 78, 76]
]

# 国語・算数・社会の点数を合計 --- (*2)
kokugo = 0
sansu = 0
syakai = 0
for p in p_list:
    kokugo = kokugo + p[1]
    sansu = sansu + p[2]
    syakai = syakai + p[3]

# 平均点を表示 --- (*3)
ninzu = len(p_list)
print("国語=" + str(kokugo / ninzu))
print("算数=" + str(sansu / ninzu))
print("社会=" + str(syakai / ninzu))

