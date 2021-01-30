import pandas as pd
import numpy as np
print("=== DataFrame ===")
ary = np.arange(27).reshape(-1, 3)
ary[-1] = np.array([2021, 1, 4])  # 最後の行だけ上書き
df = pd.DataFrame(data=ary)
print(df)
print("== to_csv ===")
print(df.to_csv("user/output.csv", sep=","))
print("== to_pickle ===")
#print(df.to_pickle("output.pkl"))
print("=== to_dict ===")
print(df.to_dict())
print("=== to_json ===")
print(df.to_json())
print("=== to_latex ===")
print(df.to_latex())
print("=== to_records ===")
print(df.to_records())
print("=== to_string ===")
print(df.to_string())
print("=== to_clipboard ===")
print(df.to_clipboard())
print("=== read_csv ===")
#df2 = pd.read_csv("iris.csv")
df2 = pd.read_csv("user/secret.csv")
print(df2)
print("=== Series ===")
#new?
#s = pd.Series(np.arange(5), index=["a", "b", "c", "d", "e"])
#print(s)
print("=== cut ===")
#print(pd.cut(s, 2))
print("=== qcut ===")
#print(pd.qcut(s, 2))
print("=== to_numeric ===")
#print(pd.to_numeric(s))



