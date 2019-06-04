import bawrapper

def show_next_olympic(year):
  i= 4  - year %  4 
  year2=year + i
  
  s= "{0}年の次のオリンピックは{1}年" .format(year,year2)
  print(s)


show_next_olympic( 2016 )
show_next_olympic( 2018 )
show_next_olympic( 2020 )
