@echo off
d:
cd d:\ffmpeg\bin
ffmpeg -stream_loop -1 -re -i video-h265.mkv -vcodec libx265 -acodec aac -f mpegts srt://192.168.1.102:9000?streamid=192.168.1.102:9000/live/stream,role=publisher