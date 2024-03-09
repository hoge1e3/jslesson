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
class HealingPlayer(Player):
    def status(self):
        super().status()
        print ("Ability: hp+1 on attack")
p1=Player("Slime", 20, 10, 5)
p2=HealingPlayer("Dragon", 10, 10, 3)
p1.status()
p2.status()
