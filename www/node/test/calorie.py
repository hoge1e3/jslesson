# 消費カロリーを計算して表示する関数 --- (*1)
def show_calorie(min, weight = 50):
    kcal = weight * 2 * (min / 60) * 1.05
    msg = "体重{0}kgの人が{1}分歩くと{2}kcal消費"
    s = msg.format(weight, min, kcal)
    print(s)

# 関数を呼ぶ
show_calorie(30, weight = 60) # --- (*2)
show_calorie(30, weight = 60)
show_calorie(30) # --- (*3)
show_calorie(60)




