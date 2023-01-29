@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffmpeg -re -stream_loop -1 -i 1.mp4 -vcodec libx265 -acodec pcm_alaw -ac 1 -ar 8000 -rtsp_transport udp -f rtsp rtsp://%vhost%:8554/live/stream

