@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffplay rtmp://%vhost%:1935/live/stream