from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
print(df["name"].values[ 0 ])