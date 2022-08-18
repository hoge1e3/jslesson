:loop
cd /d %~dp0

cd ..\..
call babel www\js\build --out-dir www\es5\build
copy www\es5\build\python\PyLib.js www\runtime\lib\python\
pause
goto loop
