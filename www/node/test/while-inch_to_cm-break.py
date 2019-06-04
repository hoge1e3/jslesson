while True:
    print(" --- ")
    s = input("インチは？")
    if s == "": break # 空行なら脱出
    inch = float(s)
    cm = inch * 2.54
    print(str(cm)+"センチです")

