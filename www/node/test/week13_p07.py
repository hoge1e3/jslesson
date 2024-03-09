import pandas
df=pandas.read_csv("class/score.csv")
idx=int(input("index=?"))
if 0<=idx<len(df):
    print("name={} math={} english={}".format( df["name"].values[idx], df["math"].values[idx], df["english"].values[idx]))
else:
    print("Not found")
