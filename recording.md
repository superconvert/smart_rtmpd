# smart rtmpd recorder stream

- recorder stream
you can use recorder function. change app tag from live to rec, live ---> rec, see below :
```bash
ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.105:8554/rec/stream
```
smart rtmpd will generator recorder file in /rec directory

- query recorder list
you can browse url : 
```bash
http request：
http://192.168.1.1:8080/api/rec

http response：
{
    "dirs" : 
    [
        "music",
        "sport"
    ]
} 
```
music & sport is recorder name

- query the specified stream name
```bash
http request：
http://192.168.1.1:8080/rec/sport

http response：
{
    "dirs" : 
    [
        "2022-05-21",
	"2022-05-22"
    ]
}
```
day 2022-05-21 & "2022-05-22 has recorder stream

- query the specified video file
```bash
http request：
http://192.168.1.1:8080/rec/sport?day=2022-05-21

http response：
{
    "files" :
    [
        "18-22-11.m3u8",
        "18-24-33.m3u8",
        "18-34-02.m3u8"
    ]
}
```

- replay recorder video
you can use player replay this video 
```bash
ffplay http://192.168.1.1:8080/rec/sport?day=2022-05-21&time=18-22-11.m3u8
ffplay http://192.168.1.1:8080/rec/sport?day=2022-05-21&time=18-24-33.m3u8
ffplay http://192.168.1.1:8080/rec/sport?day=2022-05-21&time=18-32-02.m3u8
```

# download file or vod mode :

1. you can put a video file into /vod directory, for example: test.mkv
2. use player ffplay http://192.168.1.1:8080/vod/test.mkv
3. you can make a sub directory in the /vod, for example: /vod/discovery
4. put a video file into /vod/discovery directory, for example: space.mkv
5. use player play it, ffplay http://192.168.1.1:8080/vod/discovery/space.mkv

more web interface, see this link : https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md
