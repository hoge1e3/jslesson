from bawrapper import *
class Billfold:
  def __init__(self,bill10000,bill5000,bill1000):
    self.bill10000=bill10000
    self.bill5000=bill5000
    self.bill1000=bill1000
  def __str__(self):
    return "10000x{}, 5000x{}, 1000x{}, total={}".format(self.bill10000,self.bill5000,self.bill1000,self.getAmount())
  def getAmount(self):
    return self.bill10000 *  10000  + self.bill5000 *  5000  + self.bill1000 *  1000 
  def addBill(self,bill):
    self.bill10000+=bill //  10000 
    self.bill5000+=bill %  10000  //  5000 
    self.bill1000+=bill %  5000  //  1000 
  def add(self,bill,count):
    if (count <  0 ):
      print("error:negative number")
    elif (bill ==  10000 ):
      self.bill10000+=count
    elif (bill ==  5000 ):
      self.bill5000+=count
    elif (bill ==  1000 ):
      self.bill1000+=count
    else:
      print("error:no such bill",bill)
bill=Billfold( 2 , 1 , 4 )
print(bill)
bill.addBill( 18000 )
print(bill)
man=int(input("bill10000=?"))
bill.add( 10000 ,man)
go=int(input("bill5000=?"))
bill.add( 5000 ,go)
sen=int(input("bill1000=?"))
bill.add( 1000 ,sen)
print(bill)