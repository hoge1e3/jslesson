from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
idx=int(input("index=?"))
print("name={} math={} english={}".format(df["name"].values[idx],df["math"].values[idx],df["english"].values[idx]))