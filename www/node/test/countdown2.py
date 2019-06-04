import datetime

# 特定の日付から東京オリンピックまで調べる関数 --- (*1)
def calc_days(y, m, d):
    olympic = datetime.date(2020, 7, 24)
    target = datetime.date(y, m, d)
    days = (olympic - target).days
    s = str(y) + "/" + str(m) + "/" + str(d) + "から"
    print(s + str(days) + "日後")

# 特定の日付から東京オリンピックまで何日？ --- (*2)
calc_days(2017, 12, 1)
calc_days(2018, 3, 1)

# 今日から何日？ --- (*3)
t = datetime.date.today()
calc_days(t.year, t.month, t.day)

