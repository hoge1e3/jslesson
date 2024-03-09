class Person:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
    def __str__(self):
        return "{} age={} weight={}".format(self.name, self.age, self.weight)
people=[]
people.append(Person("yamada",20,55))
people.append(Person("tanaka",50,62))
people.append(Person("suzuki",5,15))
people.append(Person("sasaki",40,52))
people.append(Person("satoh",25,68))
f=open("user/people.txt","w")
for p in people:
    f.write("{},{},{}\n".format(p.name, p.age, p.weight))
f.close()
