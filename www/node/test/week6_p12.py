class Player:
    def __init__(self, name, hp, mp, ap):
        self.name=name
        self.hp=hp
        self.mp=mp
        self.ap=ap
    def isLost(self):
        return self.hp<=0
y=Player("Yamada", 20, 15, 5)
for i in range(10):
    print(y.hp)
    print(y.isLost())
    y.hp-=3
