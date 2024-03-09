from bawrapper import *
class Product:
  def __init__(self,name,price):
    self.name=name
    self.price=price
  def __str__(self):
    return "{} {}yen".format(self.name,self.price)
f=open("user/products.txt","r")
products=[]
for line in f:
  name,price=line.split(",")
  products.append(Product(name,int(price)))
f.close()
for p in products:
  print(p)
price=int(input("price=?"))
print("----")
for p in products:
  if p.price >= price:
    print(p)
