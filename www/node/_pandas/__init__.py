import pandas as p
import bawrapper
import os

DataFrame=p.DataFrame
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
