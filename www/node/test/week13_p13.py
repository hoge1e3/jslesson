import pandas
df=pandas.read_csv("class/score.csv")
df=df.sort_values("math")
print(df)
