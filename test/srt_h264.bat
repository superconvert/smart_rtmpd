@echo off
d:
cd d:\ffmpeg\bin
ffmpeg -re -i 22.mp4 -vcodec libx264 -acodec aac -f mpegts srt://192.168.1.102:9000?streamid=192.168.1.102:9000/live/stream,role=publisher