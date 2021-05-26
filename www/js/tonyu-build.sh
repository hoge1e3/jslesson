Tonyu2=../../Tonyu2
BAWWW=../
cd $BAWWW
cp $Tonyu2/www/js/g2/SysDebugger_concat.min* runtime/lib/tonyu/
cp $Tonyu2/www/js/g2/runScript2_concat.min* runtime/lib/tonyu/
cp $Tonyu2/www/js/lib/R.js js/build/tonyu/
cp $Tonyu2/www/js/ide/ResEditor.js js/build/tonyu/
cp $Tonyu2/www/js/ide/ResEditors.js js/build/tonyu/
cp $Tonyu2/www/js/lang/BuilderClient4Sys.js js/lang/

cp $Tonyu2/www/js/fs/Assets.js js/build/tonyu/
cp $Tonyu2/www/js/ide/ImageDetailEditor.js js/build/tonyu/
# cp $Tonyu2/www/js/ide/OggConverter.js js/build/tonyu/
cp $Tonyu2/www/js/ide/sysMod.js js/build/tonyu/
cp $Tonyu2/www/js/ide/thumbnail.js js/build/tonyu/

cp $Tonyu2/www/Kernel/js/concat.js runtime/lib/tonyu/kernel.js
cp $Tonyu2/www/Kernel/js/concat.js.map runtime/lib/tonyu/kernel.js.map
cp $Tonyu2/www/BuilderWorker.js .

babel BuilderWorker.js --out-file BuilderWorker.es5.temp.js
# insert importScripts("polyfill.js"); into 1st line of BuilderWorker.es5.js
echo 'importScripts("polyfill.js");' > BuilderWorker.es5.js
cat BuilderWorker.es5.temp.js >> BuilderWorker.es5.js
rm BuilderWorker.es5.temp.js

# check
#  new prj
#  add resource
#  betupe-ji jikkou
