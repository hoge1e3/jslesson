import pandas
df=pandas.read_csv("class/pref-change.csv")
df["change"]=df["p2022"]-df["p2010"]
print(df.head(10))
