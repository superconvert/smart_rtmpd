@echo off
d:
cd d:\ffmpeg\bin
rem ffmpeg -threads 2 -re -stream_loop -1 -i 33.mp4 -vcodec libx264 -acodec aac -f rtsp rtsp://192.168.1.102:8554/live/stream
ffmpeg -re -stream_loop -1 -i 1.mp4 -vcodec libx264 -acodec aac -f rtsp rtsp://192.168.1.102:8554/live/stream

