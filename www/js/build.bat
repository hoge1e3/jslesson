:loop
cd /d %~dp0
rem use scripts/copyKer.sh to copy kernels
rem should betupe-ji jikkou
del gen\edit_concat.js
call r_js -o build_edit.js
del gen\selPrj_concat.js
call r_js -o build_selPrj.js
del gen\pyRun_concat.js
call r_js -o build_pyRun.js
del gen\BARunner.js
call r_js -o build_BATestRunner.js
node updateBAVer.js

cd ..\..
rem call babel www\js\gen\edit_concat.js --out-file www\es5\gen\edit_concat.js
rem call babel www\js\gen\selPrj_concat.js --out-file www\es5\gen\selPrj_concat.js
rem call babel www\js\gen\pyRun_concat.js --out-file www\es5\gen\pyRun_concat.js
rem call babel www\js\ --out-dir www\es5\
copy www\build\python\PyLib.js www\runtime\lib\python\
cd www\js
rem cd ..
rem call babel BuilderWorker.js --out-file BuilderWorker.es5.js
rem insert importScripts("polyfill.js"); into 1st line of BuilderWorker.es5.js
rem cd js
pause
goto loop
