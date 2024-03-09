def prod(a,b):
    s=0
    for i in range(len(a)):
        s+=a[i]*b[-i-1]
    return s
print(prod([1,2,3], [10,5,4] ))
print(prod([3,2,1], [0, 20, -1] ))
print(prod([1,2,3,4,5],[1,3,5,7,9] ))
print(prod([5,2,4,1,3,6],[-1,-1,-1,1,1,1] ))
