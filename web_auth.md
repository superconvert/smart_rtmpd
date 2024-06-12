# thirdparty auth url :
   
see this link : https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md
you can modify config.xml file 
	
<authurl>192.168.1.32:8181</authurl>
	
192.168.1.32:8181 is your auth http server url， if you want push a stream 
```bash
rtmp://192.168.1.1/live/stream?user=admin&token=xqtv312
```

smart_rtmpd will send http get request 
```bash
http://192.168.1.32:8181/live/stream?user=admin&token=xqtv312&type=rtmp&role=publisher 
```
to your auth http server.

if you set <authurl router="/api/auth">192.168.1.32:8181</authurl>，smart_rtmpd will send http get request
```bash
http://192.168.1.32:8181/api/auth/live/stream?user=admin&token=xqtv312&type=rtmp&role=publisher
```

- http url param type

|name|description|
|---|---|
|http| http request authorization |
|rtmp| rtmp request authorization |
|rtsp| rtsp request authorization |
|srt| srt request authorization |

- http url param role

|name|description|
|---|---|
|api|from http api interface|
|upload|from http upload|
|download|from http vod download|
|publisher|push stream from rtmp, rtsp, srt |
|player|pull stream from rtmp, rtsp, srt, http rec, http flv, hls, dash, webrtc|
	
if you have below http play request :
```bash
http://192.168.1.1/live/stream.flv?user=admin&token=xqtv312 ( http-flv )
http://192.168.1.1/live/stream.m3u8?user=admin&token=xqtv312 ( http-m3u8 )
http://192.168.1.1/live/stream.mpd?user=admin&token=xqtv312 ( http-mpd )
```
		
smart_rtmpd will send http url auth to auto server :
```bash
http://192.168.1.32:8181/live/stream.flv?user=admin&token=xqtv312&type=rtmp&role=player
http://192.168.1.32:8181/live/stream.m3u8?user=admin&token=xqtv312&type=rtmp&role=player
http://192.168.1.32:8181/live/stream.mpd?user=admin&token=xqtv312&type=rtmp&role=player
```
		
verify success return HTTP 200 OK, other be failed.
	
for more safe auth verify :
```bash
smart_rtmpd  --- http ---> proxy  --- https ---> auth server
```
you can use sample proxy module first process auth request, and then forward request to your 
auth http server.
