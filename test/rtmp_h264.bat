@echo off
d:
cd d:\ffmpeg\bin
ffmpeg -re -stream_loop -1 -i 1.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.102:1935/live/stream