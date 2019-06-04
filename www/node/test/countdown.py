import datetime

# 特定の日付から東京オリンピックまで調べる関数 --- (*1)
def calc_days(y, m, d):
    # タイムスタンプを得る --- (*2)
    olympic = datetime.datetime(2020, 7, 24).timestamp()
    target = datetime.datetime(y, m, d).timestamp()
    # 何日なのかを調べる --- (*3)
    perday = 24 * 60 * 60
    days = (olympic - target) // perday
    # 計算結果を表示 --- (*4)
    s = "{0}/{1}/{2}から{3}日後".format(y, m, d, int(days))
    print(s)

# 特定の日付から東京オリンピックまで何日？ --- (*5)
calc_days(2017, 12, 1)
calc_days(2018, 3, 1)

# 今日から何日？ --- (*6)
t = datetime.date.today()
calc_days(t.year, t.month, t.day)

