value = 30 # グローバル変数の定義 --- (*1)

def hoge1():
    print(value) # グローバル変数を参照 --- (*2)

def hoge2():
    global value  # グローバル変数として定義 --- (*3)
    value = 999  #
    print(value) # 

hoge1()
hoge2()
print(value) # --- (*4)

