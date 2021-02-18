import numpy as np
import math

print('---arange---')
print(np.arange(3))
print(np.arange(3.0))
print(np.arange(3,7))
print(np.arange(3,7,2))

print('---zeros---')
print(np.zeros(5))
print(np.zeros((5,), dtype=int))
print(np.zeros((2, 1)))
s_ze = (2,2)
print(np.zeros(s_ze))
print(np.zeros((2,), dtype=[('x', 'i4'), ('y', 'i4')]))

print('---ones---')
print(np.ones(5))
print(np.ones((5,), dtype=int))
print(np.ones((2, 1)))
s_on = (2,2)
print(np.ones(s_on))

print('---empty---')
print(np.empty([2,2]))
print(np.empty([2,2], dtype=int))

print('---hstack---')
a_hs = np.array((1,2,3))
b_hs = np.array((2,3,4))
print(np.hstack((a_hs,b_hs)))
a_hs = np.array([[1],[2],[3]])
b_hs = np.array([[2],[3],[4]])
print(np.hstack((a_hs,b_hs)))

print('---vstack---')
a_vs = np.array((1,2,3))
b_vs = np.array((2,3,4))
print(np.vstack((a_vs,b_vs)))
a_vs = np.array([[1],[2],[3]])
b_vs = np.array([[2],[3],[4]])
print(np.vstack((a_vs,b_vs)))

print('---concatenate---')
a_con = np.array([[1, 2], [3, 4]])
b_con = np.array([[5, 6]])
print(np.concatenate((a_con, b_con), axis=0))
print(np.concatenate((a_con, b_con.T), axis=1))
print(np.concatenate((a_con, b_con), axis=None))

print('---sum---')
print(np.sum([0.5, 1.5]))
#   AttributeError: module '_numpy' has no attribute 'int32'
#print(np.sum([0.5, 0.7, 0.2, 1.5], dtype=np.int32))
print(np.sum([[0, 1], [0, 5]]))
print(np.sum([[0, 1], [0, 5]], axis=0))
print(np.sum([[0, 1], [0, 5]], axis=1))
#   AttributeError: module '_numpy' has no attribute 'nan'
#print(np.sum([[0, 1], [np.nan, 5]], where=[False, True], axis=1))
print(np.sum([10], initial=5))

print('---mean---')
a_me = np.array([[1, 2], [3, 4]])
print(np.mean(a_me))
print(np.mean(a_me, axis=0))
print(np.mean(a_me, axis=1))

print('---min---')
a_min = np.arange(-10,10).reshape((4,5))
print(np.min(a_min))
print(np.min(a_min,axis=1))

print('---max---')
a_max = np.arange(-10,10).reshape((4,5))
print(np.max(a_max))
print(np.max(a_max,axis=1))

print('---exp---')
#   AttributeError: module '_numpy' has no attribute 'pi'
#x_exp = np.linspace(-2*np.pi, 2*np.pi, 100)
#   文法エラー
#xx_exp = x_exp + 1j * x_exp[:, np.newaxis]
#print(np.exp(x_exp))

print('---log---')
#   AttributeError: module '_numpy' has no attribute 'e'
#print(np.log([1, np.e, np.e**2, 0]))
print('---log10---')
print(np.log10([1e-15, -3.]))
#   C:\Users\kazu\Dropbox\jslesson\www\node\_numpy\__init__.py:30: RuntimeWarning: invalid value encountered in log10
#   return n.log10(*a,**k)
#   ↑ anacondaでも出る

print('---expand_dims---')
x_ed = np.array([1, 2])
print(x_ed.shape)
y_ed=np.expand_dims(x_ed, axis=0)
print(y_ed)
print(y_ed.shape)
y_ed = np.expand_dims(x_ed, axis=1)
print(y_ed)
print(y_ed.shape)
#    ↓ Anacondaでも壊れる
#y_ed = np.expand_dims(x_ed, axis=(0, 1))
#print(y_ed)
#y_ed = np.expand_dims(x_ed, axis=(2, 0))
#print(y_ed)

print('---std---')
a_std = np.array([[1, 2], [3, 4]])
print(np.std(a_std))
print(np.std(a_std, axis=0))
print(np.std(a_std, axis=1))

print('---reshape---')
a_res = np.array([[1,2,3], [4,5,6]])
print(np.reshape(a_res, 6))
print(np.reshape(a_res, 6, order='F'))
print(np.reshape(a_res, (3,-1)) )

print('---abs---')
a_abs = np.linspace(-10,10,11)
print(np.abs(a_abs))

print('---where---')
a_where = np.arange(10)
print(np.where(a_where < 5, a_where, 10*a_where))
print(np.where([[True, False], [True, True]],
               [[1, 2], [3, 4]],
               [[9, 8], [7, 6]]))

print('---argmax---')
a_am = np.arange(6).reshape(2,3) + 10
print(np.argmax(a_am))
print(np.argmax(a_am, axis=0))
print(np.argmax(a_am, axis=1))

print('---add---')
print(np.add(1.0, 4.0))
x1_add = np.arange(9.0).reshape((3, 3))
x2_add = np.arange(3.0)
print(np.add(x1_add, x2_add))

print('---transpose---')
x_tra1 = np.arange(4).reshape((2,2))
print(np.transpose(x_tra1))
x_tra2 = np.ones((1, 2, 3))
print(np.transpose(x_tra2, (1, 0, 2)).shape)

print('---meshgrid---')
nx_mg, ny_mg = (3, 2)
x_mg = np.linspace(0, 1, nx_mg)
y_mg = np.linspace(0, 1, ny_mg)
xv_mg, yv_mg = np.meshgrid(x_mg, y_mg)
print(xv_mg)
print(yv_mg)
xv_mg, yv_mg = np.meshgrid(x_mg, y_mg, sparse=True)
print(xv_mg)
print(yv_mg)

print('---linspace---')
print(np.linspace(2.0, 3.0, num=5))
print(np.linspace(2.0, 3.0, num=5, endpoint=False))
print(np.linspace(2.0, 3.0, num=5, retstep=True))

print('---sin---')
print(np.sin(math.pi/2.))
print(np.sin(np.array((0., 30., 45., 60., 90.)) * math.pi / 180. ))

print('---cos---')
print(np.cos(math.pi/2.))
print(np.cos(np.array([0, math.pi/2, math.pi])))

print('---tan---')
print(np.tan(math.pi/2.))
print(np.tan(np.array([-math.pi, math.pi/2, math.pi])))

print('---arcsin---')
print(np.arcsin(0))
print(np.arcsin([1,-1]))

print('---arccos---')
print(np.arccos(0))
print(np.arccos([1,-1]))

print('---arctan---')
print(np.arctan(0))
print(np.arctan([1,-1]))

print('---polyfit---')
x_pf = np.array([0.0, 1.0, 2.0, 3.0,  4.0,  5.0])
y_pf = np.array([0.0, 0.8, 0.9, 0.1, -0.8, -1.0])
print(np.polyfit(x_pf, y_pf, 3))

print('---count_nonzero---')
a_cnz = np.array([[0, 1, 7, 0],
                 [3, 0, 2, 19]])
print(np.count_nonzero(a_cnz))
#   TypeError: count_nonzero() got an unexpected keyword argument 'axis'
#print(np.count_nonzero(a_cnz, axis=0))
#print(np.count_nonzero(a_cnz, axis=1))
#print(np.count_nonzero(a_cnz, axis=1, keepdims=True))

print('---argsort---')
x_as = np.array([3, 1, 2])
print(np.argsort(x_as))
x_as = np.array([[0, 3], [2, 2]])
print(np.argsort(x_as, axis=0))
print(np.argsort(x_as, axis=1))
x_as = np.array([(1, 0), (0, 1)], dtype=[('x', '<i4'), ('y', '<i4')])
print(x_as)
print(np.argsort(x_as, order=('x','y')))
print(np.argsort(x_as, order=('y','x')))

print('---copy---')
x_cp = np.array([1, 2, 3])
y_cp = x_cp
z_cp = np.copy(x_cp)
x_cp[0] = 10
print(x_cp[0] == y_cp[0])
print(x_cp[0] == z_cp[0])
#   Error: 変数または関数objectは未定義です:np_test2.py:210:22
#a_cp = np.array([1, 'm', [2, 3, 4]], dtype=object)
#b_cp = np.copy(a_cp)
#b_cp[2][0] = 10
#print(a_cp)

print('---sqrt---')
print(np.sqrt([1,4,9]))
#   文法エラー
#print(np.sqrt([4, -1, -3+4J]))
#AttributeError: module '_numpy' has no attribute 'inf'
#print(np.sqrt([4, -1, np.inf]))

print('---cov---')
x_cov = np.array([[0, 2], [1, 1], [2, 0]]).T
print(np.cov(x_cov))

print('---corrcoef---')
x_cor = np.array([[1, 2, 1, 9, 10, 3, 2, 6, 7],
                  [2, 1, 8, 3, 7, 5, 10, 7, 2]])
print(np.corrcoef(x_cor))
y_cor = np.array([2, 1, 1, 8, 9, 4, 3, 5, 7])
print(np.corrcoef(x_cor, y_cor))

print('---dot---')
print(np.dot(3, 4))
#   文法エラー
#print(np.dot([2j, 3j], [2j, 3j]))
a_dot = [[1, 0], [0, 1]]
b_dot = [[4, 1], [2, 2]]
print(np.dot(a_dot, b_dot))

print('---cumprod---')
a_cp = np.array([1,2,3])
print(np.cumprod(a_cp))
a_cp = np.array([[1, 2, 3], [4, 5, 6]])
#   Traceback (most recent call last):
#   \numpy\core\fromnumeric.py", line 50, in _wrapfunc
#    return getattr(obj, method)(*args, **kwds)
#   TypeError: data type not understood
#print(np.cumprod(a_cp, dtype=float))
print(np.cumprod(a_cp, axis=0))
print(np.cumprod(a_cp,axis=1))
