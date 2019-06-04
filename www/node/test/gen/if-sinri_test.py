import bawrapper

print( "これから無人島でしばらく一人で生活しなくてはなりません。" )
print( "好きなものを一つだけ持って行くとしたら何を持って行く？" )
print( "1: ナイフ" )
print( "2: 携帯電話" )
print( "3: 漫画" )


s=bawrapper._input( "答えは？" )
i=bawrapper._int(s)


if i <  1 :
  print( "範囲外" )
  bawrapper._quit()
if i >  3 :
  print( "範囲外" )
  bawrapper._quit()


print( "\n----\n" )
print( "無人島生活から、将来の恋人について分かります。" )
if i ==  1 :
  print( "現実的な道具を選んだあなたは.." )
  print( "現実的な身の丈にあった相手を選ぶでしょう。" )
elif i ==  2 :
  print( "誰かとつながる道具を選んだあなたは.." )
  print( "話し好きな賑やかな相手が相応しいでしょう。" )
elif i ==  3 :
  print( "実用よりも娯楽アイテムを選んだあなたは.." )
  print( "夢見がちなので、理想がとても高いでしょう。" )
