class Person:
    def __init__(self, name, age):
        self.name=name
        self.age=age
    def __str__(self):
        return "(I am {}. I am {} years old.)".format(self.name, self.age)
y=Person("Yamada" , 23)
print(y)
print("y="+str(y))
print("y={}".format(y))
