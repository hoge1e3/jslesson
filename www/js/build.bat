cd /d %~dp0
copy ..\fs\home\devel\devel\JSLKer\js\concat.js ..\fs\Tonyu\Projects\JSLKer\js\concat.js
call r_js -o build_edit.js
call r_js -o build_selPrj.js
pause
