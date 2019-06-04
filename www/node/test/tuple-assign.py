# coding: utf-8
# Your code here!



#x,=3  TypeError: 'int' object is not iterable
#print (x)
x=3,
print (x)
x,=3,
print (x)

x=3,5
print (x)
x=3,5,
print (x)
x=(3,5)
print (x)
(x)=3,5
print (x)
#(x,)=3,5 ValueError: too many values to unpack
#print (x)
x,y=3,5
print (x,y)
x,y=3,5,
print (x,y)
x,y,=3,5
print (x,y)
x,y,=3,5,
print (x,y)


(x,y)=3,5
print (x,y)
(x,y)=(3,5,)
print (x,y)
x,y,=(3,5)
print (x,y)
(x,y,)=3,5,
print (x,y)

