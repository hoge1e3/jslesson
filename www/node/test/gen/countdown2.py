from bawrapper import *
import datetime


def calc_days(y,m,d):
  olympic=datetime.date( 2020 , 7 , 24 )
  target=datetime.date(y,m,d)
  days=(olympic - target).days
  s=str(y) + "/" + str(m) + "/" + str(d) + "から"
  print(s + str(days) + "日後")


calc_days( 2017 , 12 , 1 )
calc_days( 2018 , 3 , 1 )


t=datetime.date.today()
calc_days(t.year,t.month,t.day)