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
rem copy www\js\build\python\PyLib.js www\runtime\lib\python\

copy www\js\ctrans\ctype.js www\runtime\lib\c\
copy www\js\ctrans\lib.js www\runtime\lib\c\
rem copy www\build\c\.js www\runtime\lib\c\
rem copy www\build\c\.js www\runtime\lib\c\
rem copy www\build\c\.js www\runtime\lib\c\
rem copy www\build\c\.js www\runtime\lib\c\

cd www\js
pause
goto loop
