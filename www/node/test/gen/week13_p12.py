from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
e=int(input("english=?"))
df2=df[df["english"] >= e]
print(df2)