import pandas
df=pandas.read_csv("class/pref-area.csv")
df=df.sort_values("population",ascending=False)
print(df.head(10))
