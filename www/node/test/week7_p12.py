class Person:
    def __init__(self, family_name, given_name, age):
        self.family_name=family_name
        self.given_name=given_name
        self.age=age
    def get_name(self):
        n="{} {}".format(self.family_name, self.given_name)
        return n
    def family_name_changed(self, family_name):
        np=Person(family_name, self.given_name, self.age) 
        return np
y=Person("Yamada" , "Taro", 23)
t=Person("Tanaka" , "Hanako", 50)
print (y.get_name())
print (t.get_name())
s=y.family_name_changed("Suzuki")
k=t.family_name_changed("Kimura")
print (y.get_name())
print (t.get_name())
print (s.get_name())
print (k.get_name())
