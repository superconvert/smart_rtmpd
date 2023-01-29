@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffmpeg -re -stream_loop -1 -i video-h265.mkv -vcodec libx265 -acodec aac -f rtsp rtsp://%vhost%:8554/live/stream