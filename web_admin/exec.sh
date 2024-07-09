#!/bin/sh

cd ../bin

# 添加本地执行路径
export LD_LIBRARY_PATH=./

while true; do
    # 启动一个循环，定时检查进程是否存在
    server=`ps aux | grep "./smart_rtmpd -d" | grep -v grep`
    if [ ! "$server" ]; then
        # 如果不存在就重新启动
        ./smart_rtmpd -d
    fi
    sleep 3
done
