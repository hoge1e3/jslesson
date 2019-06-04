# Python
import re
import matplotlib.pyplot as plt

f=open ("class/scatter.txt")
Xs=[] 
Ys=[]
for line in f:
    line=re.sub(r'\n',"",line)    
    #print(line)
    (x,y)=line.split("\t")
    #print(x,y)
    plt.scatter(int(x), int(y))
    Xs.append(int(x))
    Ys.append(int(y))
f.close
plt.show()
plt.clf()

plt.plot(Xs,Ys)

plt.show()

