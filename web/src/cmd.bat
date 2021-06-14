@echo off

cd ../smart_rtmpd/

set one=%1
set pname=smart_rtmpd.exe
set ppath=../smart_rtmpd/%pname%
set stopfail='stop service %pname% failed.'
set startfail='start service %pname% failed.'
set restartfail='restart service %pname% failed.'
set restorefail='restore service %pname% failed.'

rem ---------------------------------------------------------
if "%one%" == "start" (
    call:start_service
    tasklist | findstr /i "%pname%" > nul
    if %errorlevel%==1 (
        echo "%startfail%"
        exit /B 1
    ) else (
        echo %pname%
        exit /B 0
    )

rem -------------------------------------------------------
) else if "%one%" == "stop" (
    call:stop_service
    tasklist | findstr /i "%pname%" > nul
    if %errorlevel%==1 (
        echo "%pname%"
        exit /B 0
    ) else (
        echo %stopfail%
        exit /B 1
    )

rem ---------------------------------------------------------
) else if "%one%" == "restart" (
    call:restart_service
    tasklist | findstr /i "%pname%" > nul
    if %errorlevel%==1 (
        echo "%restartfail%"
        exit /B 1
    ) else (
        echo %pname%
        exit /B 0
    )

rem ---------------------------------------------------------
) else if "%one%" == "restore" (
    call:restore_service
    tasklist | findstr /i "%pname%" > nul
    if %errorlevel%==1 (
        echo "%restorefail%"
        exit /B 1
    ) else (
        echo %pname%
        exit /B 0
    )

) else (
    echo 'parameter muste be start, stop, restart or restore'

)
goto:eof

rem ------------------------------------------------
rem start service
rem ------------------------------------------------
:start_service
    tasklist | findstr /i "%pname%" > nul
    if %errorlevel%==0 (
        exit /B 0
    )
    start %ppath% %1
goto:eof

rem ------------------------------------------------
rem stop service
rem ------------------------------------------------
:stop_service
    tasklist | findstr /i "%pname%" > nul
    if %errorlevel%==1 (
        exit /B 0
    )
    taskkill /f /im %pname%
goto:eof

rem ------------------------------------------------
rem restart service
rem ------------------------------------------------
:restart_service
    call:stop_service
    call:start_service start
goto:eof

rem ------------------------------------------------
rem restore service
rem ------------------------------------------------
:restore_service
    call:stop_service
    call:start_service restore
goto:eof