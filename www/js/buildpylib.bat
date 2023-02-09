:loop
cd /d %~dp0

cd ..\..
call babel www\js\build\python\PyLib.js --out-file www\es5\build\python\PyLib.js
copy www\es5\build\python\PyLib.js www\runtime\lib\python\
pause
goto loop
