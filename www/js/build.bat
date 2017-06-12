cd /d %~dp0
rem use scripts/copyKer.sh to copy kernels
rem should betupe-ji jikkou
del gen\edit_concat.js
call r_js -o build_edit.js
del gen\selPrj_concat.js
call r_js -o build_selPrj.js
pause
