from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
print(df["name"].values[ 0 ])
print(df["english"].values[ 3 ])
print(df["math"].values[ 4 ])