@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffplay rtsp://%vhost%:8554/live/stream