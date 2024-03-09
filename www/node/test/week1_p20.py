n=int(input("n=?"))
q=2
while n%q!=0:
    q+=1
if q==n:
    print(n, "is a prime number")
else:
    print(n, "is NOT a prime number")
