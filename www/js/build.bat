cd /d %~dp0
rem use scripts/copyKer.sh to copy kernels
rem should betupe-ji jikkou
del gen\edit_concat.js
call r_js -o build_edit.js
del gen\selPrj_concat.js
call r_js -o build_selPrj.js
del gen\pyRun_concat.js
call r_js -o build_pyRun.js

cd ..\..
call babel www\js\gen\edit_concat.js --out-file www\es5\gen\edit_concat.js
call babel www\js\gen\selPrj_concat.js --out-file www\es5\gen\selPrj_concat.js
call babel www\js\gen\pyRun_concat.js --out-file www\es5\gen\pyRun_concat.js
cd www\js
pause
