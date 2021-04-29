@echo off
d:
cd d:\ffmpeg\bin
ffmpeg -re -stream_loop -1 -i video-h265.mkv -vcodec libx265 -acodec aac -f rtsp rtsp://192.168.1.102:8554/live/stream