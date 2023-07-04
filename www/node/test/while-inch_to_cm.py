print("インチからセンチへの変換")
print("プログラムを終わるには,[Ctrl]+[C]キーを押します。")
c=0
while c<10:
    print(" --- ")
    inch = float(input("インチは？"))
    cm = inch * 2.54
    print(str(cm)+"センチです")
    c+=1

