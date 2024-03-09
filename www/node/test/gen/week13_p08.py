from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
print(df["math"] + df["english"])