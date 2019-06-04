# 水族館の料金を計算する関数を定義 --- (*1)
def calc_fee(age, is_monday):
    fee = 2000 # 一般2000円
    # 年齢に応じて割引
    if age < 3:
        fee = 0
    elif age < 6:
        fee = 500
    elif age >= 60:
        fee = 1500
    # 月曜は2割引
    if is_monday:
        fee = int(fee * 0.8)
    return fee

# 関数を利用する --- (*2)
print(calc_fee(18, False)) # 一般(月曜以外)
print(calc_fee(20, True)) # 一般(月曜)
print(calc_fee(2, False)) # 赤ちゃん(月曜以外)
print(calc_fee(70, True)) # シニア(月曜)


