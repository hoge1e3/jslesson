class Plus100:
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return str(self.value)
    def __add__(self, other):
        return Plus100 ( self.value + other.value + 100)
x = Plus100(5)
print(x)
x = Plus100(1)
y = Plus100(2)
print(x + y)
x = Plus100(-5)
y = Plus100(30)
print(x + y)
x = Plus100(-1)
y = Plus100(-20)
z = Plus100(5) 
print(x + y + z)
