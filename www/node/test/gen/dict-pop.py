import bawrapper

s="""
サンマ,カツオ,サンマ,サンマ,マグロ,フグ,マグロ,マグロ,マグロ,サンマ,ニシン,イワシ,サンマ,サンマ,カツオ,サンマ,カツオ,サンマ,カツオ,サンマ,マグロ,マグロ,マグロ,ニシン
"""



s=s.strip()

s_list=s.split(",")


result={}
for name in s_list:
  name=name.strip()
  
  if not name in result:
    result[name]= 0 
  
  result[name]=result[name] +  1 


for name,v in result.items():
  print(name + " = " + bawrapper._str(v))
