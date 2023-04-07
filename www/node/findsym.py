from glob import glob
import re
for f in glob("*/*.py"):
    with open(f,encoding="utf8") as fp:
        for line in fp:
            cnt={}
            line=line.strip()
            for m in re.findall(r'\b\w+\b', line):
                if m in cnt:
                    cnt[m]+=1
                    if cnt[m]==2:
                        print(f, line)
                else:
                    cnt[m]=1