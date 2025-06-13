class A:
    def __init__(self,x):
        self.x=x
    def __str__(self):
        return f"AAA{self.x}"
print(f" a={A(3)} ")
