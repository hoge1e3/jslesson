import numpy as np

# kowareru
#import numpy.random

#Traceback (most recent call last):
#  File "C:\Users\kazu\Dropbox\jslesson\www\..\data\pythonwork\608583\conv.py", line 8, in <module>
#    print(np.random.randint( 2 ,size= 10 ))
#AttributeError: module '_numpy' has no attribute 'random'
# ↓これがないと壊れる
import numpy.random as npr

np.random.seed(seed=75)
print('---randint---')
print(np.random.randint(2, size=10))
print(np.random.randint(1, size=10))
print(np.random.randint(5, size=(2, 4)))
#print(np.random.randint(1, [3, 5, 10]))
#print(np.random.randint([1, 5, 7], 10))
#print(np.random.randint([1, 3, 5, 7], [[10], [20]], dtype=np.uint8))

print('---randn---')
print(np.random.randn())
print(3 + 2.5 * np.random.randn(2, 4))

print('---rand---')
#TypeError: rand() takes 0 positional arguments but 2 were given
print(np.random.rand(3,2))

print('---normal---')
print(np.random.normal(3, 2.5, size=(2, 4)))

print('---random---')
print(np.random.random((2,3)))

print('---random_sample---')
print(np.random.random_sample())
print(type(np.random.random_sample()))
print(np.random.random_sample((5,)))
print(5 * np.random.random_sample((3, 2)) - 5)

print('---choice---')
print(np.random.choice(5, 3))
print(np.random.choice(5, 3, p=[0.1, 0, 0.3, 0.6, 0]))
print(np.random.choice(5, 3, replace=False))
print(np.random.choice(5, 3, replace=False, p=[0.1, 0, 0.3, 0.6, 0]))
aa_milne_arr = ['pooh', 'rabbit', 'piglet', 'Christopher']
print(np.random.choice(aa_milne_arr, 5, p=[0.5, 0.1, 0.1, 0.3]))

print('---seed---')
np.random.seed(seed=50)
print(np.random.rand())

