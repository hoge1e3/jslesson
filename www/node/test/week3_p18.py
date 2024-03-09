def stars(n):
    for i in range(n):
        print("*",end="")
    print()
def starTriangle(n):
    for i in range(1,n+1):
        stars(i)
starTriangle(3)
starTriangle(5)
