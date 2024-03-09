def checkData(a, x, y):
    for e in a:
        if e>=x and e<y:
            return True
    return False
a=[10,25,15,8]
if checkData(a, 0, 8):
    print("0..8 is in ",a)
else:
    print("0..8 is not in ",a)
print(checkData(a,25, 100))
print(checkData(a,15, 16))
print(checkData(a,26, 30))
