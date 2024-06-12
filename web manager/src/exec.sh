#!/bin/sh

cd ../bin

#添加本地执行路径
export LD_LIBRARY_PATH=./

while true; do
    #启动一个循环，定时检查进程是否存在
    server=`ps aux | grep smart_rtmpd | grep -v grep`
    if [ ! "$server" ]; then
        #如果不存在就重新启动
        nohup ./smart_rtmpd >/dev/null 2>&1 &
        sleep 5
    fi
    sleep 3
done
