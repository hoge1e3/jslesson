class Player:
    def __init__(self, name, hp, mp, ap):
        self.name=name
        self.hp=hp
        self.mp=mp
        self.ap=ap
    def status(self):
        print ("Name: {}".format(self.name))
        print ("Hit Point: {}".format(self.hp))
        print ("Magic Point: {}".format(self.mp))
        print ("Attack Point: {}".format(self.ap))
        print ("Weapon: {}".format(self.weapon))
    def attack(self, target):
        target.hp-=self.ap+self.weapon.ap
    def equip(self, w):
        self.weapon=w
class Weapon:
    def __init__(self, name, ap):
        self.name=name
        self.ap=ap
    def __str__(self):
        return "[{} ap={}]".format(self.name, self.ap)
print("Player 1")
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
p1=Player(name, hp, mp, ap)
print("Player 2")
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
p2=Player(name, hp, mp, ap)
print("Player 1 Weapon")
name=input("name=?")
ap=int(input("ap=?"))
w1=Weapon(name, ap)
print("Player 2 Weapon")
name=input("name=?")
ap=int(input("ap=?"))
w2=Weapon(name, ap)
p1.equip(w1)
p2.equip(w2)
p1.status()
p2.status()
p1.attack(p2)
p1.status()
p2.status()
p2.attack(p1)
p1.status()
p2.status()
