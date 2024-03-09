import pandas
df=pandas.read_csv("class/score.csv")
print(df["math"]+df["english"])
