
a=[2,3,10,20,50,22,4,43,5]
a[1:7:2]=["hoge","fuga","piyo"]
print (a[1:7:2])
print (a)
del a[1]
print (a)
"""
a=[2,3,10,20,50,22,4,43,5]
print a[1:7:2]
a=[5,6,7]
"""

"""
x,y=2,3
print(x,y)
class Test:
    def __getitem__(self,idx):
        print(idx)
        return 3
        
t=Test()
print (t[2,2:3])
"""
