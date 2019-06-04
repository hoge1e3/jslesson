import bawrapper

name=bawrapper._input( "名前は？" )
age=bawrapper._input( "年齢は？" )
hobby=bawrapper._input( "趣味は？" )
nickname=bawrapper._input( "みんなからなんて呼ばれたい？" )

s1= "はじめまして。"  + name +  "と言います。\n" 
s2= "年齢は"  + age +  "才で、趣味は"  + hobby +  "です。\n" 
s3= "ぜひ、"  + nickname +  "と呼んでください。\n" 
s4= "みんなと仲良くなりたいです。" 
print(( "--------" ))
print((s1 + s2 + s3 + s4))
