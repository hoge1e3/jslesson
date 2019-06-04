# 引数すべてを足し合わせる関数を定義 --- (*1)
def tasu(*args):
    r = 0
    for v in args:
        r += v
    return r

# 関数を利用
print( tasu(1, 2) ) # --- (*2)
print( tasu(1, 2, 3) ) # --- (*3)
print( tasu(1, 2, 3, 4, 5) ) # --- (*4)

