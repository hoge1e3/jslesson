class Billfold:
    def __init__(self, bill10000, bill5000, bill1000):
            self.bill10000 = bill10000
            self.bill5000 = bill5000
            self.bill1000 = bill1000
    def __str__(self):
            return "10000x{}, 5000x{}, 1000x{}, total={}".format(self.bill10000, self.bill5000, self.bill1000, self.getAmount())
    def getAmount(self):
            return self.bill10000*10000 + self.bill5000*5000 + self.bill1000*1000
    def addBill(self, bill):
            self.bill10000 += bill//10000
            self.bill5000 += bill%10000//5000
            self.bill1000 += bill%5000//1000
    def add10000(self, man):
            if(man < 0):
                    print("error:negative number")
            else:
                    self.bill10000 += man
    def add5000(self, go):
            if(go < 0):
                    print("error:negative number")
            else:
                    self.bill5000 += go
    def add1000(self, sen):
            if(sen < 0):
                    print("error:negative number")
            else:
                    self.bill1000 += sen
bill = Billfold(2,1,4)
print(bill)
bill.addBill(18000)
print(bill)
man = int(input("bill10000=?"))
bill.add10000(man)
go = int(input("bill5000=?"))
bill.add5000(go)
sen = int(input("bill1000=?"))
bill.add1000(sen)
print(bill)
