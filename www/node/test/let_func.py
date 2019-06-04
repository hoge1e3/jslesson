# 関数の定義 --- (*1)
def tasu(a, b):
    return a + b

# lambdaで関数の定義 --- (*2)
hiku = lambda a, b: a - b

# 変数に関数を代入 -- (*3)
add = tasu
sub = hiku

# 変数に代入した関数を実行 --- (*4)
print( add(100, 10) )
print( sub(50, 5) )

