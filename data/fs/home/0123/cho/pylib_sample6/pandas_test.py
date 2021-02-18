import pandas as pd

# データフレームの初期化
df = pd.DataFrame({
        'name'  : ["neko", "inu", "saru", "kiji"],
        'hp': [157, 78, 58, 83],
        'mp' : [157, 85, 60, 86]
})

# 表示
#df.from_csv("c:/bin/secret.csv")
#print(df.from_csv)
print(df)
print(df.dtypes)
print(df.describe())
