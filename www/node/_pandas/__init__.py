import pandas as p
import bawrapper
import os

def makeSecret():
    class Secret:
        pass
    secret=Secret()
    class DataFrameProxy:
        def __init__(self, raw):
            self.__secret=secret
            self.__raw=raw
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
            #self.dot=raw.dot
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
            self.plot=raw.plot
            self.corr=raw.corr
            self.count=raw.count
            self.cov=raw.cov
            self.cumprod=raw.cumprod
            self.cumsum=raw.cumsum
            #self.dev=raw.dev
            self.items=raw.items
            self.keys=raw.keys
            self.mask=raw.mask
            self.notna=raw.notna
            self.quantile=raw.quantile
            self.query=raw.query
            self.rename=raw.rename
            self.replace=raw.replace
            #self.to_numpy=raw.to_numpy
            #self.value_counts=raw.value_counts
            self.values=raw.values
            self.where=raw.where
        def __str__(self):
            return self.__raw.__str__()
        def __getitem__(self,i):
            return self.__raw.__getitem__(i)
        def dot(self,other):
            return self.__raw.dot(getRaw(other))
        def to_csv(self, file, **k):
            f=bawrapper.resolve(file)
            return self.__raw.to_csv(f, **k)
        def getRaw(self, s):
            if s==secret:
                return self.__raw

    def DataFrame(*a, **k):
        raw=p.DataFrame(*a, **k)
        res=DataFrameProxy(raw)
        return res
    #merge=p.merge
    def getRaw(target):
        if isinstance(target, DataFrameProxy):
            return target.getRaw(secret)
        else:# isinstance(x, pandas.core.series.Series):
            return target
    def merge(left, right, *a, **k):
        #tempLeft=p.DataFrame(left.to_numpy(),columns=left.columns,index=left.index)
        #tempRight=p.DataFrame(right.to_numpy(),columns=right.columns,index=right.index)
        #merged_df=p.merge(tempLeft, tempRight, *a, **k)
        merged_df=p.merge(getRaw(left), getRaw(right), *a, **k)
        #res=DataFrame(merged_df.to_numpy(),columns=merged_df.columns,index=merged_df.index)
        res=DataFrame(merged_df)
        return res
    #merge_ordered=p.merge_ordered
    def merge_ordered(left,right,*a,**k):
        morderd_df=p.merge_ordered(getRaw(left),getRaw(right),*a,**k)
        res=DataFrame(morderd_df)
        return res
    #merge_asof=p.merge_asof
    def merge_asof(left,right,*a,**k):
        masof_df=p.merge_asof(getRaw(left), getRaw(right) ,*a,**k)
        res=DataFrame(masof_df)
        return res
    return (DataFrame, merge, merge_ordered, merge_asof)
(DataFrame, merge, merge_ordered, merge_asof)=makeSecret()

#concat=p.concat
def concat(objs, *a, **k):
    dfobjs=[]
    for obj in objs:
        tempObj=p.DataFrame(obj.to_numpy(),columns=obj.columns,index=obj.index)
        dfobjs.append(tempObj)
    concated_df=p.concat(dfobjs, *a, **k)
    #res=DataFrame(concated_df.to_numpy(),columns=concated_df.columns,index=concated_df.index)
    res=DataFrame(concated_df)
    return res

cut=p.cut


date_range=p.date_range
melt=p.melt
qcut=p.qcut


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
# Series.to_csv is harmful
#Series=p.Series
crosstab=p.crosstab

def read_csv(file, **k):
    f=bawrapper.resolve(file)
    return p.read_csv(f, **k)
