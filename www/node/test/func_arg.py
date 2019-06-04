# 値3と5をどうするのか関数fに指定する --- (*1)
def calc35(f):
    return f(3, 5)

# 関数を呼びだし
print(calc35(lambda a, b: a + b)) # --- (*2)
print(calc35(lambda a, b: a * b)) # --- (*3)

