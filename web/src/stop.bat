tasklist > templist.txt
find /i "smart_rtmpd.exe" templist.txt
if "%errorlevel%" == "1" (goto end) else (
    taskkill /f /im smart_rtmpd.exe
)
:end
del templist.txt