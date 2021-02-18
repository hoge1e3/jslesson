import pandas as p
import bawrapper
import os

class DataFrameProxy:
    def __init__(self, raw):
        self.raw=raw
        # これはできない
        #self.__str__=raw.__str__
        self.T=raw.T
        self.drop=raw.drop
        self.sort_index=raw.sort_index
        self.sort_values=raw.sort_values
        self.isin=raw.isin
        self.isnull=raw.isnull
        self.head=raw.head
        self.tail=raw.tail
        self.info=raw.info
        self.groupby=raw.groupby
        self.mean=raw.mean
        self.median=raw.median
        self.mode=raw.mode
        self.var=raw.var
        self.std=raw.std
        self.describe=raw.describe
        self.sum=raw.sum
        self.stack=raw.stack
        self.unstack=raw.unstack
        self.duplicated=raw.duplicated
        self.drop_duplicates=raw.drop_duplicates
        self.size=raw.size
        self.dropna=raw.dropna
        self.fillna=raw.fillna
        self.columns=raw.columns
        self.dot=raw.dot
        self.to_numpy=raw.to_numpy
        self.shape=raw.shape
        self.at=raw.at
        self.iat=raw.iat
        self.loc=raw.loc
        self.iloc=raw.iloc
        self.append=raw.append
        self.index=raw.index
        self.copy=raw.copy
        self.isna=raw.isna
        self.add=raw.add
        self.sub=raw.sub
        self.div=raw.div
        self.mul=raw.mul
        self.min=raw.min
        self.max=raw.max
        self.to_dict=raw.to_dict
        self.to_json=raw.to_json
        self.to_latex=raw.to_latex
        self.to_records=raw.to_records
        self.to_string=raw.to_string
    def __str__(self):
        return self.raw.__str__()
    def to_csv(self, file, **k):
        f=bawrapper.resolve(file)
        return self.raw.to_csv(f, **k)

def DataFrame(*a, **k):
    raw=p.DataFrame(*a, **k)
    res=DataFrameProxy(raw)
    return res
merge=p.merge
concat=p.concat
cut=p.cut


date_range=p.date_range
melt=p.melt
qcut=p.qcut
merge_ordered=p.merge_ordered
merge_asof=p.merge_asof
get_dummies=p.get_dummies
factorize=p.factorize
unique=p.unique
wide_to_long=p.wide_to_long
isna=p.isna
notna=p.notna
to_numeric=p.to_numeric
to_datetime=p.to_datetime
to_timedelta=p.to_timedelta
bdate_range=p.bdate_range
period_range=p.period_range
timedelta_range=p.timedelta_range
interval_range=p.interval_range

def read_csv(file, **k):
    f=bawrapper.resolve(file)
    return p.read_csv(f, **k)
