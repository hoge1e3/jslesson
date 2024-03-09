class Person:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
    def __str__(self):
        return "{} age={} weight={}".format(self.name, self.age, self.weight)
    def gain_weight(self, by):
        self.weight+=by
def gain_weights(people, by):
    for p in people:
        p.gain_weight(by)
people=[]
people.append(Person("yamada",20,55))
people.append(Person("suzuki",15,75))
people.append(Person("tanaka",50,62))
people.append(Person("sasaki",40,52))
for p in people:
    print(p)
print ("Diet start!")
gain_weights(people, -1)
for p in people:
    print(p)
print ("Rebound!")
gain_weights(people, 2)
for p in people:
    print(p)
