import numpy as np

#ones,empty
print(np.ones(3,int))
print(np.ones((2,3),int))
print(np.empty(10))

#hstack,vstack
a = np.array([[1,2,3],[4,5,6],[7,8,9]])
b = np.array([[10,20,30],[40,50,60],[70,80,90]])
print(np.vstack((a,b)))
print(np.hstack((a,b)))

#concatenate
a_con=np.ones((2,3),int)
b_con=np.zeros((2,3),int)
print(np.concatenate([a_con,b_con]))

#mean
a_me = np.arange(12).reshape(3, 4)
print(np.mean(a_me))
print(np.mean(a_me,axis=0))
print(np.mean(a_me,axis=1))

#min,max
print(np.min(a_me))
print(np.min(a_me,axis=0))
print(np.max(a_me))
print(np.max(a_me,axis=1))


# sin,cos,tan,asin,acos,atan
print("sin")
print(np.sin(0))
print(np.sin([0, 1]))
print(np.cos(1))
print(np.cos([0, 1]))
print(np.tan(1))
print(np.tan([0, 1]))
print(np.arcsin(1))
print(np.arcsin([-1,0, 1]))
print(np.arccos(1))
print(np.arccos([-1,0, 1]))
print(np.arctan(1))
print(np.arctan([-1,0, 1]))

#exp
print(np.exp(a))

#log,log10
a_log=np.linspace(1,10,10)
print(np.log(a_log))
print(np.log10(a_log))

#expand_dims
a_ed = np.arange(6).reshape(2, 3)
print(a_ed)
print(np.expand_dims(a_ed, 0))
print(np.expand_dims(a_ed, 0).shape)


