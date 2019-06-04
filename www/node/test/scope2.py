value = 30 # グローバル変数の定義 --- (*1)

def hoge1():
    print(value) # グローバル変数を参照 --- (*2)

def hoge2():
    value = 999 # ローカル変数を設定 --- (*3a)
    print(value) # ローカル変数を参照 --- (*3b)

hoge1()
hoge2()
print(value) # --- (*4)

