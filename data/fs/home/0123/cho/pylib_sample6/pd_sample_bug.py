import pandas as pd
import numpy as np
print("=== DataFrame ===")
ary = np.arange(27).reshape(-1, 3)
ary[-1] = np.array([0, 1, 2])  # 最後の行だけ上書き
df = pd.DataFrame(data=ary)
#print(df)
print("=== read_csv ===")
#df2 = pd.read_csv("iris.csv")
df2 = pd.read_csv("user/secret.csv")
#print(df2)

print("=== dot ===")
#IndexError: tuple index out of range
#print(df.dot(pd.DataFrame(np.arange(12).reshape(3, 4))))

#to_XXX関連未対応
print("== to_pickle ===")
#print(df.to_pickle("output.pkl"))
print("=== to_dict ===")
#print(df.to_dict())
print("=== to_json ===")
#print(df.to_json())
print("=== to_latex ===")
#print(df.to_latex())
print("=== to_records ===")
#print(df.to_records())
print("=== to_string ===")
#print(df.to_string())
print("=== to_clipboard ===")
#print(df.to_clipboard())

print("=== merge ===")
df_ab = pd.DataFrame({'a': ['a_1', 'a_2', 'a_3'], 'b': ['b_1', 'b_2', 'b_3']})
df_ac = pd.DataFrame({'a': ['a_1', 'a_2', 'a_4'], 'c': ['c_1', 'c_2', 'c_4']})
#TypeError: Can only merge Series or DataFrame objects, a <class '_pandas.DataFrameProxy'> was passed
#print(pd.merge(df_ab, df_ac))

print("=== concat ===")
#TypeError: cannot concatenate object of type '<class '_pandas.DataFrameProxy'>'; only Series and DataFrame objs are valid
#print(pd.concat([df, df2]))

print("=== merge_ordered ===")
dfA = pd.DataFrame({
    "key": ["a", "c", "e", "a", "c", "e"],
    "lvalue": [1, 2, 3, 1, 2, 3],
    "group": ["a", "a", "a", "b", "b", "b"]
})
dfB = pd.DataFrame({"key": ["b", "c", "d"], "rvalue": [1, 2, 3]})
#TypeError: Can only merge Series or DataFrame objects, a <class '_pandas.DataFrameProxy'> was passed
#print(pd.merge_ordered(dfA, dfB))
print("=== merge_asof ===")
left = pd.DataFrame({"a": [1, 5, 10], "left_val": ["a", "b", "c"]})
right = pd.DataFrame({"a": [1, 2, 3, 6, 7], "right_val": [1, 2, 3, 6, 7]})
#TypeError: Can only merge Series or DataFrame objects, a <class '_pandas.DataFrameProxy'> was passed
#print(pd.merge_asof(left, right, on="a"))
print("=== unique ===")
#TypeError: 'DataFrameProxy' object is not subscriptable
#print(pd.unique(df[0]))
print("=== wide_to_long ===")
dfA = pd.DataFrame({
    'famid': [1, 1, 1, 2, 2, 2, 3, 3, 3],
    'birth': [1, 2, 3, 1, 2, 3, 1, 2, 3],
    'ht1': [2.8, 2.9, 2.2, 2, 1.8, 1.9, 2.2, 2.3, 2.1],
    'ht2': [3.4, 3.8, 2.9, 3.2, 2.8, 2.4, 3.3, 3.4, 2.9]
})
#TypeError: 'DataFrameProxy' object is not subscriptable
#print(pd.wide_to_long(dfA, stubnames="ht", i=["famid", "birth"], j="age"))

#未対応,依頼なしだけど追加?
print("=== Series ===")
#s = pd.Series(np.arange(5), index=["a", "b", "c", "d", "e"])
#print(s)
print("=== cut ===")
#print(pd.cut(s, 2))
print("=== qcut ===")
#print(pd.qcut(s, 2))
print("=== to_numeric ===")
#print(pd.to_numeric(s))



