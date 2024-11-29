:loop
cd /d %~dp0

cd ..\..
copy www\js\build\python\PyLib.js www\runtime\lib\python\
pause
goto loop
