import numpy as np
import scipy.linalg as linalg
from scipy import stats

A = np.array([[6, 4, 1],
              [1, 8, -2],
              [3, 2, 0]])
b = np.array([7, 6, 8])

x = linalg.solve(A, b)

print(x)
print(A*x)


#_stats.norm.ppf(x=1.0, loc=0, scale=1)

#
print("=== genfromtxt ===")
#file read
#ary = np.genfromtxt("user/secret.csv", delimiter=",")
#print(ary)