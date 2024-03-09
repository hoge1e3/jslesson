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
name=input("name=?")
hp=int(input("hp=?"))
mp=int(input("mp=?"))
ap=int(input("ap=?"))
p1=Player(name, hp, mp, ap)
p1.status()
