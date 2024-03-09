class Box:
    def __init__(self, width, height, depth):
        self.width = width
        self.height = height
        self.depth = depth
    def __add__(self, other):
        return self.width * self.height * self.depth + other.width * other.height * other.depth
x = Box(1, 2, 3)
y = Box(3, 4, 5)
print(x+y)
