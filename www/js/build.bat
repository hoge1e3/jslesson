cd /d %~dp0
rem copy dolittle\lib.js ..\runtime\lib\dtl\lib.js
rem should betupe-ji jikkou
rem deprecated. use scripts/copyKer.sh
rem copy ..\fs\pub\a38058b7\user.js ..\fs\Tonyu\Projects\JSLKer\js\concat.js
rem copy ..\fs\pub\a38058b7\user.js ..\runtime\lib\tjs\kernel.js
call r_js -o build_edit.js
call r_js -o build_selPrj.js
pause
