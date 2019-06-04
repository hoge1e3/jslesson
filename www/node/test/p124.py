def listsum(a): # 合計を求める関数 listsum を作成
 sum = 0
 for i in range(0,len(a),1):
  sum = sum+a[i]
 return sum
a = [56,3,62,17,87,22,36,83,21,12]
sum = listsum(a) # 作った関数 listsum を呼び出し
print(sum)