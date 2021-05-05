#!/bin/bash

app="~/Application/Application.py"

function kill_proc() {
    app_name=$1
    app_pid=$(ps -e | grep $app_name | awk '{print $1}') 
    kill -9 $app_pid
}

function start() {
    echo 'start'
}

function stop() {
    kill_proc "mypython"
}

function restart() {
    stop
    start
}

case "$1" in
    start )
        start
        ;;
    stop )
        stop
        ;;
    restart )
        restart
        ;;
    * )
	echo "Usage: /opt/rtmpd start|stop|restart"
        ;;
esac
