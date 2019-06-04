def linsearch(a,p):
 for i in range(0,len(a),1):
  if a[i]==p:
   print(i,"番目に 見つかりました ")
   break
a = [61,15,82,77,21,32,53]
p = 82
linsearch(a,p)