#「実行」→「サーバで実行」を選んでください
import numpy as np
import numpy.random as rd
import matplotlib.pyplot as plt

swc=0
def quicksort(a,start,end):
    global swc
    m = int((start+end)/2)
    i = start
    j = end
    while(i<j):
        while a[i] < a[m]: 
            i = i+1
        while a[j] > a[m]: #ブラウザだとこのへんでエラー
            j = j-1
        if i>=j:
            break
        temp = a[i]
        a[i] = a[j]
        a[j] = temp
        swc+=1
        if i==m:
            m = j
        elif j==m:
            m = i
        i = i+1
        j = j-1
    if start < i-1:
        quicksort(a,start,m-1)
    if end > j+1:
        quicksort(a,m+1,end)

for n in range(5,30,2):
    a = rd.randint(1, 100, n)
    print(" ソート前 ",a)
    quicksort(a,0,len(a)-1)
    print(" ソート後 ",a)
    print("並び替え ",swc)
    plt.scatter(n,swc,color="red")
plt.show()

