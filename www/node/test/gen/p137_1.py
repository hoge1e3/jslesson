import bawrapper
yokin= 100000 
riritsu= 0.05 
for i in bawrapper._range( 10 ):
  risoku=yokin * riritsu
  yokin=yokin + risoku
  print(i +  1 , " 年目 :" ,yokin)
