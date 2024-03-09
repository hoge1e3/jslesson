class Person:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
    def __str__(self):
        return "{} age={} weight={}".format(self.name, self.age, self.weight)
p1=Person("yamada",20,55)
p2=Person("tanaka",50,62)
print(p1)
print(p2)
