class Box:
    def __init__(self, width, height, depth):
        self.width = width
        self.height = height
        self.depth = depth
    def volume(self):
        return self.width * self.height * self.depth
def volumes(boxes):
    v=0
    for box in boxes:
        v+=box.volume()
    return v
b=[Box(1, 2, 3),Box(3, 4, 5)]
print(volumes(b))
b2=[Box(11, 22, 33),Box(3, 1, 5),Box(8, 4, 0.5)]
print(volumes(b2))
