import pandas
df=pandas.read_csv("class/score.csv")
df["average"]=(df["math"]+df["english"])/2
print(df)
