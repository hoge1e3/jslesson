class Player:
    def __init__(self, name, hp, mp, ap):
        self.name=name
        self.hp=hp
        self.mp=mp
        self.ap=ap
y=Player("yamada", 20, 15, 5)
for i in range(10):
    print(y.hp)
    y.hp-=3
