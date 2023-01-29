@echo off
set /P vhost=<vhost.txt
d:
cd d:\ffmpeg\bin
ffplay srt://%vhost%:9000?streamid=%vhost%:9000/live/stream,role=player