import numpy as n

float32=n.float32
int32=n.int32
nan=n.nan
pi=n.pi
e=n.e
inf=n.inf

def arange(*a,**k):
    return n.arange(*a,**k)
def zeros(*a,**k):
    return n.zeros(*a,**k)
def ones(*a,**k):
    return n.ones(*a,**k)
def empty(*a,**k):
    return n.empty(*a,**k)
def hstack(*a,**k):
    return n.hstack(*a,**k)
def vstack(*a,**k):
    return n.vstack(*a,**k)
def concatenate(*a,**k):
    return n.concatenate(*a,**k)
def sum(*a,**k):
    return n.sum(*a,**k)
def mean(*a,**k):
    return n.mean(*a,**k)
def min(*a,**k):
    return n.min(*a,**k)
def max(*a,**k):
    return n.max(*a,**k)
def exp(*a,**k):
    return n.exp(*a,**k)
def log(*a,**k):
    return n.log(*a,**k)
def log10(*a,**k):
    return n.log10(*a,**k)
def expand_dims(*a,**k):
    return n.expand_dims(*a,**k)
def std(*a,**k):
    return n.std(*a,**k)
def reshape(*a,**k):
    return n.reshape(*a,**k)
def abs(*a,**k):
    return n.abs(*a,**k)
def where(*a,**k):
    return n.where(*a,**k)
def argmax(*a,**k):
    return n.argmax(*a,**k)
def add(*a,**k):
    return n.add(*a,**k)
def transpose(*a,**k):
    return n.transpose(*a,**k)
def meshgrid(*a,**k):
    return n.meshgrid(*a,**k)
def linspace(*a,**k):
    return n.linspace(*a,**k)
def sin(*a,**k):
    return n.sin(*a,**k)
def cos(*a,**k):
    return n.cos(*a,**k)
def tan(*a,**k):
    return n.tan(*a,**k)
def arcsin(*a,**k):
    return n.arcsin(*a,**k)
def arccos(*a,**k):
    return n.arccos(*a,**k)
def arctan(*a,**k):
    return n.arctan(*a,**k)
def polyfit(*a,**k):
    return n.polyfit(*a,**k)
count_nonzero = n.count_nonzero
def argsort(*a,**k):
    return n.argsort(*a,**k)
def copy(*a,**k):
    return n.copy(*a,**k)
def sqrt(*a,**k):
    return n.sqrt(*a,**k)
def cov(*a,**k):
    return n.cov(*a,**k)
def corrcoef(*a,**k):
    return n.corrcoef(*a,**k)
def dot(*a,**k):
    return n.dot(*a,**k)
def cumprod(*a,**k):
    return n.cumprod(*a,**k)
def array(*a,**k):
    return n.array(*a,**k)

#pi=n.pi
#nan=n.nan
#e=n.e
euler_gamma=n.euler_gamma
newaxis=n.newaxis
#inf=n.inf
identity=n.identity
sort=n.sort
repeat=n.repeat
tile=n.tile
round=n.round
argmin=n.argmin
argsort=n.argsort
median=n.median
var=n.var
log1p=n.log1p
log2=n.log2
degrees=n.degrees
radians=n.radians
deg2rad=n.deg2rad
rad2deg=n.rad2deg
unique=n.unique
isnan=n.isnan
ravel=n.ravel
imag=n.imag
real=n.real
#sum=n.sum
prod=n.prod
int8=n.int8
int16=n.int16
#int32=n.int32
int64=n.int64
float16=n.float16
#float32=n.float32
float64=n.float64

#Bit Arrow and Anaconda
#numpy has no attribute float128
#print(np.longdouble)
#<class 'numpy.float64'>

#paiza.io
#<class 'numpy.float128'>
#print(np.longdouble)
#<class 'numpy.float128'>

#float128=n.float128

full=n.full
full_like=n.full_like
ceil=n.ceil
floor=n.floor
cumsum=n.cumsum
swapaxes=n.swapaxes
resize=n.resize
squeeze=n.squeeze
isinf=n.isinf
all=n.all
any=n.any
nonzero=n.nonzero
take=n.take
tril=n.tril
triu=n.triu
column_stack=n.column_stack
row_stack=n.row_stack
r_=n.r_
hsplit=n.hsplit
vsplit=n.vsplit
array_split=n.array_split
logspace=n.logspace
diagonal=n.diagonal
dsplit=n.dsplit
dstack=n.dstack
ptp=n.ptp
choose=n.choose
put=n.put
putmask=n.putmask
cross=n.cross
trace=n.trace
conj=n.conj
ix_=n.ix_
genfromtxt=n.genfromtxt
fromregex=n.fromregex
geomspace=n.geomspace
diag=n.diag
diagflat=n.diagflat
frombuffer=n.frombuffer
