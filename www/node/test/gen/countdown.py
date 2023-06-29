import bawrapper
import datetime


def calc_days(y,m,d):
  
  olympic=datetime.datetime( 2020 , 7 , 24 ).timestamp()
  target=datetime.datetime(y,m,d).timestamp()
  
  perday= 24  *  60  *  60 
  days=(olympic - target) // perday
  
  s="{0}/{1}/{2}から{3}日後".format(y,m,d,bawrapper._int(days))
  print(s)


calc_days( 2017 , 12 , 1 )
calc_days( 2018 , 3 , 1 )


t=datetime.date.today()
calc_days(t.year,t.month,t.day)