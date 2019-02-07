# DO NOT EDIT by Atom!! Use TeraPad!!
cd ../
# dtl
# open devel/devel/Turtle
# betupe-ji jikkou
src=./data/fs/pub/01d3f7dd
dst=./www/runtime/lib/dtl
cp $src/Actor.js* $dst
cp $src/Color.js* $dst
cp $src/db.js* $dst
cp $src/Dict.js* $dst
cp $src/DOM.js* $dst
cp $src/Figure.js* $dst
cp $src/Group.js* $dst
cp $src/Japanese.js* $dst
cp $src/Japanese2.js* $dst
cp $src/TextFile.js* $dst
cp $src/Timer.js* $dst
cp $src/Turtle.js* $dst
cp $src/UI.js* $dst
cp $src/Util.js* $dst
cp $src/Vec2.js* $dst

#js
# open devel/devel/JSLKer
# betupe-ji jikkou
src=./data/fs/pub/a38058b7
dst=./www/runtime/lib/tjs
cp $src/user.js $dst/kernel.js

#c
src=./www/js/ctrans/
dst=./data/runtime/lib/c
cp $src/lib.js $dst
cp $src/util.js $dst
cp $src/x.js $dst
cp $src/ctype.js $dst
#cp $src/AsyncByGeneratorRaw.js $dst

#common?
src=./www/js/lib/
dst=./www/runtime/lib
cp $src/assert.js $dst
cp $src/Klass.js $dst
cp js/fs2/FS.js $dst
cp js/ctrans/AsyncByGenerator.js $dst
