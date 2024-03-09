from bawrapper import *
class Person:
  def __init__(self,name,age):
    self.name=name
    self.age=age
  def get_name(self):
    return self.name
  def get_age(self):
    return self.age
  def age_changed(self,age):
    np=Person(self.name,age)
    return np
y=Person("Yamada", 23 )
print(y.get_name(),y.get_age())
y_next_year=y.age_changed( 24 )
print(y.get_name(),y.get_age())
print(y_next_year.get_name(),y_next_year.get_age())