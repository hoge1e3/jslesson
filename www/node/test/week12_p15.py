class Person:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
    def __str__(self):
        return "{} age={} weight={}".format(self.name, self.age, self.weight)
    def gain_weight(self, by):
        self.weight+=by
people=[]
f=open("user/people.txt","r")
for line in f:
    (name,age,weight)=line.split(",")
    people.append( Person(name,int(age),int(weight)) )
f.close()
for p in people:
    print(p)
for p in people:
    p.gain_weight(2)
print("-----")
for p in people:
    print(p)
