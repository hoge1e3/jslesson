from bawrapper import *
import _pandas as pandas
df=pandas.read_csv("class/score.csv")
df=df.sort_values("math",ascending= False )
print(df.head( 3 ))