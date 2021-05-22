#!/bin/sh

server=`ps aux | grep exec.sh | grep -v grep | awk -F ' ' '{print $2}'`
if [ "$server" ]; then
    kill -9 $server
fi

server=`ps aux | grep smart_rtmpd | grep -v grep | awk -F ' ' '{print $2}'`
if [ "$server" ]; then
    kill -9 $server
fi

