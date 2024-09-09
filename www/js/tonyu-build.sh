Tonyu2=../../Tonyu2
BAWWW=../
cd $BAWWW
cp $Tonyu2/www/js/g2/SysDebugger_concat.min* runtime/lib/tonyu/
cp $Tonyu2/www/js/g2/runScript2_concat.min* runtime/lib/tonyu/
cp $Tonyu2/www/js/lang/BuilderClient4Sys.js js/lang/BuilderClient.js
cp $Tonyu2/www/Kernel/js/concat.js runtime/lib/tonyu/kernel.js
cp $Tonyu2/www/Kernel/js/concat.js.map runtime/lib/tonyu/kernel.js.map
cp $Tonyu2/www/BuilderWorker.js .
cp $Tonyu2/www/js/runtime/TonyuRuntime.js js/runtime/
cp $Tonyu2/www/js/runtime/TonyuRuntime.js runtime/lib/tjs/

#compile devel/devel/Parent
# run scripts/copyKer_js.sh

