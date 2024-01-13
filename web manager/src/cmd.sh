#!/bin/bash

function start() {
    nohup ./exec.sh > /dev/null 2>&1 &
}

function stop() {
    server=`ps aux | grep exec.sh | grep -v grep | awk -F ' ' '{print $2}'`
    if [ "$server" ]; then
        kill -9 $server
    fi

    server=`ps aux | grep smart_rtmpd | grep -v grep | awk -F ' ' '{print $2}'`
    if [ "$server" ]; then
        kill -9 $server
    fi
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
