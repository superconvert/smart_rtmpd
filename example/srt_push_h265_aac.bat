@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffmpeg -stream_loop -1 -re -i video-h265.mkv -vcodec libx265 -acodec aac -f mpegts srt://%vhost%:9000?streamid=%vhost%:9000/live/stream,role=publisher
