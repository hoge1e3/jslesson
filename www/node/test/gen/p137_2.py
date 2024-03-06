from bawrapper import *
import _matplotlib.pyplot as plt
riritsu= 0.05 
yokin=[ 100000 ]
for i in range( 10 ):
  risoku=int(yokin[i] * riritsu)
  yokin.append(yokin[i] + risoku)
plt.title("FUKURI KEISAN")
plt.xlabel("Year")
plt.ylabel("Yokin[YEN]")
plt.plot(yokin,marker="o")
plt.show()