@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffmpeg -stream_loop -1 -re -i 22.mp4 -vcodec libx264  -tune zerolatency -preset ultrafast  -bsf:v h264_mp4toannexb  -g 15 -keyint_min 15 -profile:v baseline -level 3.1 -pix_fmt yuv420p -r 15 -acodec aac -f mpegts -pkt_size 1316 srt://%vhost%:9000?streamid=%vhost%:9000/live/stream,role=publisher