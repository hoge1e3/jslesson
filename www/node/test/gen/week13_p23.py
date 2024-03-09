from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/pref-change.csv")
df["change"]=df["p2022"] - df["p2010"]
df2=df[df["change"] >  0 ]
print(df2)