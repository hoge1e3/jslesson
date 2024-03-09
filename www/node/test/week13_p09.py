import pandas
df=pandas.read_csv("class/score.csv")
df["sum"]=df["math"]+df["english"]
print(df)
