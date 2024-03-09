class Person:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
    def __str__(self):
        return "{} age={} weight={}".format(self.name, self.age, self.weight)
people=[]
for i in range(3):
    print("name=?",end="")
    name=input()
    print("age=?",end="")
    age=int(input())
    print("weight=?",end="")
    weight=int(input())
    people.append(Person(name, age, weight))
for p in people:
    print(p)
