class Person:
    def __init__(self, name, age):
        self.name=name
        self.age=age
    def get_name(self):
        return self.name
    def set_name(self, name):
        self.name=name
y=Person("Yamama" , 23)
print(y.get_name())
y.set_name("Yamada")
print(y.get_name())
