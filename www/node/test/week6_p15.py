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
y=Player("Yamada", 20, 15, 5)
t=Player("Tanaka", 30, 10, 8)
y.status()
t.status()
y.attack(t)
y.status()
t.status()
t.attack(y)
y.status()
t.status()
