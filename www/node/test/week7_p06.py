class Person:
    def __init__(self, name, age):
        self.name=name
        self.age=age
    def get_name(self):
        return self.name
    def get_age(self):
        return self.age
y=Person("Yamada" , 23)
t=Person("Tanaka" , 30)
s=Person("Suzuki" , 15)
print(y.get_name(), y.get_age())
print(t.get_name(), t.get_age())
print(s.get_name(), s.get_age())
