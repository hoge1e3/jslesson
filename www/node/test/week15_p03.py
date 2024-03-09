def my_range(n):
    a=[]
    i=0
    while i<n:
        a.append(i)
        i+=1
    return a
r=my_range(3)
print(r)
for i in my_range(5):
    print(i, end=" ")
for i in my_range(6):
    print(i*2, end=" ")
