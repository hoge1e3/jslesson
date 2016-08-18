cd /d %~dp0
rem copy dolittle\lib.js ..\runtime\lib\dtl\lib.js
rem should betupe-ji jikkou
copy ..\fs\home\devel\devel\public\JSLKer\user.js ..\fs\Tonyu\Projects\JSLKer\js\concat.js
copy ..\fs\home\devel\devel\public\JSLKer\user.js ..\runtime\lib\tjs\kernel.js
call r_js -o build_edit.js
call r_js -o build_selPrj.js
pause
