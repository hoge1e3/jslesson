from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
df2=df[df["math"] <  75 ]
print(df2)