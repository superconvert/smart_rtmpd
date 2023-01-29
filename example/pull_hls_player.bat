@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffplay http://%vhost%:8080/live/stream.m3u8