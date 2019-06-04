# 買い物金額を尋ねる --- (*1)
total_str = input("買い物の合計金額は？")
total = int(total_str)
# 5000円を超えたら1割引に --- (*2)
if total >= 5000:
    total = int(total * 0.9)
    print("- 1割引適用")
# 1万円未満なら送料が必要 --- (*3)
if total < 10000:
    total = total + 1500
    print("+ 送料1500円")
else:
    print("- 送料無料適用")
# 合計金額を表示 --- (*4)
print("支払い金額は、" + str(total) + "円です")

