import pandas as pd

# データフレームの初期化
df = pd.read_csv("user/secret.csv")
#DataFrame()
# 表示
#df=df.from_csv("c:/bin/secret.csv")
#print(df.from_csv)
print(df)
print(df.dtypes)
print(df.describe())
print( (df["a"]+df["b"]) [0])


