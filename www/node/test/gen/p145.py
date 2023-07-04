import bawrapper
import math as math
import _matplotlib.pyplot as plt
dt= 0.01 
v0= 30 
g= 9.8 
x=[ 0 ]
y=[ 0 ]
angle= 45.0  * math.pi /  180.0 
vx=[v0 * math.cos(angle)]
vy=[v0 * math.sin(angle)]
for i in bawrapper._range( 1000 ):
  vx.append(vx[i])
  vy.append(vy[i] - g * dt)
  x.append(x[i] + vx[i] * dt)
  y.append(y[i] + (vy[i] + vy[i +  1 ]) /  2.0  * dt)
  if y[i] <  0 :
    break
plt.plot(x,y)
plt.title("parabollic motion")
plt.xlabel("distance")
plt.ylabel("height")
plt.show()