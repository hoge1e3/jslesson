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
            #self.T=raw.T
            """
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
            """
            self.size=raw.size
            """
            self.dropna=raw.dropna
            self.fillna=raw.fillna
            """
            self.columns=raw.columns
            """
            #self.dot=raw.dot
            self.to_numpy=raw.to_numpy
            """
            self.shape=raw.shape
            self.at=raw.at
            self.iat=raw.iat
            self.loc=raw.loc
            self.iloc=raw.iloc
            """
            self.append=raw.append
            """
            self.index=raw.index
            """
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
            """
            self.plot=raw.plot
            """self.corr=raw.corr
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
            """
        def __str__(self):
            return self.__raw.__str__()
        def __getitem__(self,i):
            return wrap(self.__raw.__getitem__(i))
        def __getattr__(self,name):
            return wrap(self.__raw.__getattr__(name))
        def dot(self,other):
            return self.__raw.dot(getRaw(other))
        def to_csv(self, file=None, **k):
            if file is None:
                return self.__raw.to_csv(**k)
            f=bawrapper.resolve(file)
            return self.__raw.to_csv(f, **k)
        def to_json(self, file=None, **k):
            if file is None:
                return self.__raw.to_json(**k)
            f=bawrapper.resolve(file)
            return self.__raw.to_json(f, **k)
        def getRaw(self, s):
            if s==secret:
                return self.__raw

    def DataFrame(*a, **k):
        raw=p.DataFrame(*a, **k)
        res=DataFrameProxy(raw)
        return res
    def wrapMethod(proxyClass, methodName):
        def l(self, *a, **k):
            ua=[ getRaw(x) for x in a]
            uk=dict()
            for key,val in k.items():
                uk[key]=getRaw(val)
            #return wrap( getattr(self.getRaw(), methodName)(*ua, **uk) )
            return wrap( getattr(self.getRaw(secret), methodName)(*ua, **uk) )
        setattr(proxyClass, methodName, l)

    dataframeAllowList=["drop","sort_index","sort_values","isin","isnull","head","tail",
                        "info","groupby","mean","median","mode","var","std","describe",
                        "sum","stack","unstack","duplicated","drop_duplicates","dropna",
                        "fillna","to_numpy","append","copy","isna","add","sub","div","mul",
                        "min","max","to_dict","to_latex","to_records","to_string",
                        "corr","count","cov","cumprod","cumsum","items","keys",
                        "mask","notna","quantile","query","rename","replace","values","where"]

    for m in dataframeAllowList:
        wrapMethod(DataFrameProxy,m)

    #wrapMethod(SeriesProxy, "abs")
    class SeriesProxy:
        def __init__(self,raw):
            self.__secret=secret
            self.__raw=raw
            """
            self.abs=raw.abs
            self.add=raw.add
            self.append=raw.append
            """
            self.at=raw.at
            """
            self.corr=raw.corr
            self.count=raw.count
            self.cov=raw.cov
            self.cumprod=raw.cumprod
            self.cumsum=raw.cumsum
            self.describe=raw.describe
            self.duplicated=raw.duplicated
            self.fillna=raw.fillna
            self.groupby=raw.groupby
            self.head=raw.head
            """
            self.iat=raw.iat
            """
            self.idxmax=raw.idxmax
            self.idxmin=raw.idxmin
            """
            #self.iloc=raw.iloc
            self.index=raw.index
            """
            self.isin=raw.isin
            self.isna=raw.isna
            self.items=raw.items
            self.iteritems=raw.iteritems
            self.keys=raw.keys
            """
            #self.loc=raw.loc
            """
            self.mask=raw.mask
            self.max=raw.max
            self.mean=raw.mean
            self.median=raw.median
            self.min=raw.min
            self.mode=raw.mode
            self.notna=raw.notna
            self.quantile=raw.quantile
            self.rename=raw.rename
            self.replace=raw.replace
            """
            self.shape=raw.shape
            """
            self.sort_index=raw.sort_index
            self.sort_values=raw.sort_values
            self.std=raw.std
            self.sum=raw.sum
            self.tail=raw.tail
            #self.to_csv=raw.to_csv
            self.to_dict=raw.to_dict
            self.to_frame=raw.to_frame
            self.to_json=raw.to_json
            self.to_numpy=raw.to_numpy
            self.to_string=raw.to_string
            self.tolist=raw.tolist
            self.unique=raw.unique
            self.value_counts=raw.value_counts
            """
            self.values=raw.values
            """
            self.var=raw.var
            self.where=raw.where
            """
        def __str__(self):
            return self.__raw.__str__()
        def __getitem__(self,i):
            return wrap(self.__raw.__getitem__(i))
        def __getattr__(self,name):
            return wrap(self.__raw.__getattr__(name))
        def to_csv(self, file, **k):
            f=bawrapper.resolve(file)
            return self.__raw.to_csv(f, **k)
        def getRaw(self, s):
            if s==secret:
                return self.__raw

    def Series(*a, **k):
        raw=p.Series(*a, **k)
        res=SeriesProxy(raw)
        return res

    seriesAllowList=["abs","add","append","corr","count","cov","cumprod","cumsum",
                   "describe","duplicated","fillna","groupby","head","idxmax","idxmin",
                   "isin","isna","items","iteritems","keys","mask","max","mean",
                   "median","min","mode","notna","quantile","rename","replace",
                   "sort_index","sort_values","std","sum","tail","to_dict",
                   "to_frame","to_json","to_numpy","to_string","to_list","unique",
                   "value_counts","var","where","unstack"]
    for m in seriesAllowList:
        wrapMethod(SeriesProxy,m)


    #merge=p.merge
    def getRaw(target):
        if isinstance(target, DataFrameProxy):
            return target.getRaw(secret)
        elif isinstance(target, SeriesProxy):
            return target.getRaw(secret)
        else:
            return target

    def wrap(target):
        if isinstance(target, p.core.frame.DataFrame):
            return DataFrame(target)
        elif isinstance(target, p.core.series.Series):
            return Series(target)
        else:
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
    def cut(x,bins,*a,**k):
        ret=p.cut(getRaw(x),bins,*a,**k)
        return wrap(ret)
    def qcut(x,q,*a,**k):
        ret=p.qcut(getRaw(x),q,*a,**k)
        return wrap(ret)
    def to_numeric(arg,*a,**k):
        ret=p.to_numeric(getRaw(arg),*a,**k)
        return wrap(ret)
    def melt(frame,*a,**k):
        ret=p.melt(getRaw(frame),*a,**k)
        return wrap(ret)
    def unique(values,*a,**k):
        ret=p.unique(getRaw(values),*a,**k)
        return wrap(ret)
    def wide_to_long(df,*a,**k):
        ret=p.wide_to_long(getRaw(df),*a,**k)
        return wrap(ret)
    def get_dummies(data,*a,**k):
        ret=p.get_dummies(getRaw(data),*a,**k)
        return wrap(ret)
    def crosstab(index, columns,*a,**k):
        ret=p.crosstab(getRaw(index),getRaw(columns),*a,**k)
        return wrap(ret)
    def notna(obj,*a,**k):
        ret=p.notna(getRaw(obj),*a,**k)
        return wrap(ret)

    return (DataFrame, merge, merge_ordered, merge_asof, Series, cut, qcut, to_numeric, melt, unique, wide_to_long, get_dummies, crosstab, notna)
(DataFrame, merge, merge_ordered, merge_asof, Series, cut, qcut, to_numeric, melt, unique, wide_to_long, get_dummies, crosstab, notna)=makeSecret()

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

#cut=p.cut


date_range=p.date_range
#melt=p.melt
#qcut=p.qcut


#get_dummies=p.get_dummies
factorize=p.factorize
#unique=p.unique
#wide_to_long=p.wide_to_long
isna=p.isna
#notna=p.notna
#to_numeric=p.to_numeric
to_datetime=p.to_datetime
to_timedelta=p.to_timedelta
bdate_range=p.bdate_range
period_range=p.period_range
timedelta_range=p.timedelta_range
interval_range=p.interval_range
# Series.to_csv is harmful
#Series=p.Series
#crosstab=p.crosstab

def read_csv(file, **k):
    f=bawrapper.resolve(file)
    return p.read_csv(f, **k)
