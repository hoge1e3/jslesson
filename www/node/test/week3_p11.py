def product(a):
    s=1
    for e in a:
        s*=e
    return s
a1=[5, 1, 8, -3]
a2=[3, 8, 6, -6, -1]    
a3=[-10, -5, 7, 10, 0, 10]    
print(product(a1))
print(product(a2))
print(product(a3))
