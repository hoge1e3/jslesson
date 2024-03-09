import pandas
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
    def attack(self, target):
        target.hp-=self.ap
    def isLost(self):
        return self.hp<=0
df=pandas.read_csv("class/players.csv")
print(df)
print("Player 1")
name1=input("name=?")
p1df=df[df["name"]==name1]
print("Player 2")
name2=input("name=?")
p2df=df[df["name"]==name2]
if len(p1df)==0 or len(p2df)==0:
    print("Invalid name")
else:
    hp=p1df["hp"].values[0]
    mp=p1df["mp"].values[0]
    ap=p1df["ap"].values[0]
    p1=Player(name1, hp, mp, ap)
    hp=p2df["hp"].values[0]
    mp=p2df["mp"].values[0]
    ap=p2df["ap"].values[0]
    p2=Player(name2, hp, mp, ap)
    while True:
        p1.status()
        p2.status()
        if p1.isLost():
            print (p2.name, "win")
            break
        print(p1.name,"'s attack")
        p1.attack(p2)
        p1.status()
        p2.status()
        if p2.isLost():
            print (p1.name, "win")
            break
        print(p2.name,"'s attack")
        p2.attack(p1)
