from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/pref-area.csv")
df["density"]=df["population"] / df["area"]
df=df.sort_values("density")
print(df.head( 10 ))