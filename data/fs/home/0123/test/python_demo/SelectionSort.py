#「実行」→「サーバで実行」を選んでください
import numpy as np
import numpy.random as rd
import matplotlib.pyplot as plt

swc=0
def selectionsort(a):
    global swc
    for i in range(0,len(a),1):
        for j in range(i+1,len(a),1):
            if a[j]<a[i]:
                swc+=1#並べ替え回数
                temp = a[i]
                a[i] = a[j]
                a[j] = temp

#配列数を増やしながら
#並べ替え回数をグラフ化
for n in range(5,30,2):
    a = rd.randint(1, 100, n)
    print(" ソート前 ",a)
    selectionsort(a)
    print(" ソート後 ",a)
    print("並び替え ",swc)
    plt.scatter(n,swc,color="blue")
    
plt.show()

