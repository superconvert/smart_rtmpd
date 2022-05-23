# smart_rtmpd description

You can translate documents from Chinese to English through Google Translate！！！

smart rtmpd is a streaming media server. It can run on multiple systems ubuntu, centos, freebsd, windows & arm. It is small, independent, easy to deploy, and has high performance. The supported protocols are rtmp, rtsp, srt, webrtc, http, hls, dash, etc. 

It has two versions multithreading and coroutine

                   
# build ffmpeg support rtmps, see this link:

https://www.iiwnz.com/compile-ffmpeg-with-rtmps-for-facebook/

you can play rtmps with vlc player.
    
# download url

http://www.qiyicc.com/download/rtmpd.zip

# support protocol

| client | server | protocol |
|---|---|---|
|srt     |smart_rtmpd |rtmp[s], http[s]-flv, ws(s)-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc, srt|
|rtmp[s] |smart_rtmpd |rtmp[s], http[s]-flv, ws(s)-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc, srt|
|rtsp[s] |smart_rtmpd |rtmp[s], http[s]-flv, ws(s)-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc, srt|

# media codec

| video codec | audio codec |
|---|---|
|h264, h265|aac|
|vp8 ( webrtc )|opus ( webrtc )|
    
# rtmp url  

- right format

|url|description|
|---|---|
|rtmp://192.168.1.1:1935/live/stream|live stream|
|rtmp://192.168.1.1:1935/rec/stream|record stream|

only support live or rec app tag .

- bad format

|url|description|
|---|---|
|rmtp://192.168.1.1:1935/abc/stream|bad format|
|rmtp://192.168.1.1:1935/sky/camera|bad format|
|rmtp://192.168.1.1:1935/xxx/live|bad format|

not support abc, sky, xxx or other format app tag !!!!!!!
      
# push stream
   
- ffmpeg push rtmp stream      
```bash
ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.105:8554/live/stream1
ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.105:8554/live/stream2
ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f flv rtmp://192.168.1.105:9554/live/music
ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f flv rtmp://192.168.1.105:9554/live/sport
```
      
- ffmpeg push rtsp stream
```bash
ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f rtsp rtsp://192.168.1.105:8554/live/stream1
ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f rtsp rtsp://192.168.1.105:8554/live/stream2
ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f rtsp rtsp://192.168.1.105:9554/live/music
ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f rtsp rtsp://192.168.1.105:9554/live/sport
```
	
- ffmpeg push srt stream
```bash
ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f mpegts srt://192.168.1.105:9000?streamid=192.168.1.105:9000/live/stream,role=publisher
```

- ffmpeg play srt stream
```bash
ffplay srt://192.168.1.105:9000?streamid=192.168.1.105:9000/live/stream,role=player
```
- more scripts 
```bash
https://github.com/superconvert/smart_rtmpd/tree/master/test
```
      
# recorder stream

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

more web interface, see this link : https://my.oschina.net/u/4249347/blog/5529704

# nat map mode :

   ![image](https://github.com/superconvert/smart_rtmpd/blob/master/nat.png)
   	 
   outer user can push stream rtmp://61.180.166.16/live/stream, inner user can play with rtmp://192.168.1.1/live/stream
      
# thirdparty auth url :
   
see this link : https://blog.csdn.net/freeabc/article/details/105781985
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
smart_rtmpd  --- http ---> proxy  --- https ---> auth server ， you can use sample proxy module first process auth request, and then forward request to your 
auth http server.
    
      
# build cluster or cdn distribution :
   
      if you have two server
      server A (intranet ip: 192.168.1.1, domain: www.qiyicc.com) 
      server B (intranet ip: 192.168.1.2, domain: www.qiyicc.com)
     
      you can modify policy.xml file in server A:
      ... ...
      <vhosts>
          <vhost name="rtmp://www.qiyicc.com/live">
	      <forward rewrite="">192.168.1.2</forward>			
	  </vhost>
      </vhosts>
    
     if you push stream rtmp://www.qiyicc.com/live/stream to server A， the server A will forward this stream to server B, 
     if you push stream rtmp://www.qiyicc.com/live/sport to server A, it is also forard this stream to server B.
     user can pull url rtmp://www.qiyicc.com/live/stream or rtmp://www.qiyicc.com/live/sport from server B， 
     for many server repeat this proccess or each other forward.
     this is call app forward!
     
![image](https://github.com/superconvert/smart_rtmpd/blob/master/app%20forward.png)
    
# forward thirtparty :
  
     if you have rmtp url rtmp://www.qiyicc.com/live/sport, you cank distribution this stream to other service.
     for example : rtmp://www.espn.com/live/sport, thirtypart server address : 54.230.173.30
     
     you can modify config.xml file
     ... ...
     ... ...
     <vhosts>			
         <url name="rtmp://www.qiyicc.com/live/sport">	    
	    <forward rewrite="rtmp://www.espn.com/live/sport">54.230.173.30:1935</forward>			
	    <forward rewrite="rtmps://www.espn.com/live/sport">54.230.173.32:1935</forward>
	    <forward></forward>
	 </url>
     </vhosts>
    
    thirtpart user can play this stream.
    this is call url forward!   
    good luck. 
![image](https://github.com/superconvert/smart_rtmpd/blob/master/url%20forward.png)
    

# web portal

  web browser <-------> nodejs server ( source code ) <----> smart_rtmpd
  see https://github.com/superconvert/smart_rtmpd/tree/master/web/src
  
  web interface :
  https://my.oschina.net/u/4249347/blog/5529704
  
# web player

  you can put all file ( see below url ) to smart_rtmpd html dir
  https://github.com/superconvert/smart_rtmpd/tree/master/h5%20player/demo
  input url http://192.168.1.1:8080 ，good luck!
    

# smart_webrtc description

1. download smart_webrtc.zip from github.

2. unzip it, unzip smart_webrtc_win.zip

3. run smart_webrtc.exe, if your ip is 192.168.1.1

4. push rtmp stream to smart_webrtc.exe

   ffmpeg.exe -re -i oceans.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.1/live/stream

5. open chrome browse, input url :  https://192.168.1.1

6. in web player edit input 192.168.1.1, click play button.

# pure webrtc description

1. Why is it called pure webrtc?
We know that the extended version of smart_rtmpd is called smart_webrtc, which already supports the webrtc function; however, the function of webrtc here only refers to push streaming through rtmp, rtsp, srt protocols, and smart_webrtc transcodes the video through the media layer video (h264 ---> vp8 ) And audio (aac ---> opus) to achieve this function, currently only supports H5 streaming in webrtc mode.

The pure webrtc function here is the pure webrtc function, which is parallel to the existing smart_rtmpd function. There is no interaction between them, there is no intercommunication and transcoding. That is to say, rtmp, rtsp, srt are mutually converted, and there is no connection between pure webrtc and them, including signaling and media data.

2. What are the advantages of pure webrtc?
Pure webrtc functions are all realized through web pages. As long as the browser version supports webrtc functions, it can meet your requirements and further realize your requirements on this basis. This greatly adapts to almost all devices, compatibility issues, and environmental problems are almost no longer obstacles! ! !

Pure webrtc deployment is more convenient, as long as you configure smart_rtmpd and click Run, you only need to open the browser and enter the URL on the front end, and all your needs can be met. This greatly simplifies your various configuration troubles, compatibility issues, and environmental settings, all of which are thrown aside.

3. What functions does pure webrtc have?
Account login, online list/user search, message chat, peer audio and video (webrtc p2p)

Chat room list, chat room search, chat room entry, chat room user list, chat room user online notification, user show list, user show notification, chat room group chat, chat room audio and video (webrtc sfu)

4. How to use the pure webrtc function of smart_rtmpd
4.1 Making a certificate

Why do I need to make a certificate? Generally, the browser opens the audio and video equipment, and the https link is required to have the authority to execute it. Therefore, we need to make a certificate to access the internal http server of smart_rtmpd via https. In this way, there will be no problem when you open the audio and video equipment through the web page.

If you have a formal certificate, you can ignore section 4.1. You know that a certificate requires money, and most of the testing and verification process is without a certificate. Now I will teach you how to generate a certificate.

Here, mkcert is used to generate the certificate, which needs to be downloaded from github,

https://github.com/FiloSottile/mkcert/releases

We generally choose mkcert-xxx-windows-amd64.exe to download to the local and rename it to mkcert.exe.

4.1.1

In the command line (win + r hotkey pops up the run dialog box, enter cmd to enter), switch to the directory where mkcert.exe is located

4.1.2

Assuming that the operating address of your smart_rtmpd server is 192.168.1.1, here we have a virtual URL of www.smartrtmpd.com, then we enter

mkcert.exe www.smartrtmpd.com 192.168.1.1
Then the corresponding private key and certificate will be generated in the corresponding directory, which is basically similar to www.smartrtmpd.com+1-key.pem, www.smartrtmpd.com+1.pem format, we renamed server respectively. Key and server.crt, be careful not to make a mistake, the one with the key is the private key, the one without the key is the certificate.

4.1.3

Install the certificate to the local, don’t ask me why, just follow the execution below

mkcert.exe -install
4.1.4

Modify the local dns (c:\windows\system32\drivers\etc\hosts) file and add the following statement to this file.

192.168.1.1 www.smartrtmpd.com
Note that you need to add this configuration to verify the function of smart_rtmpd on that machine. The purpose of this sentence is to tell the machine that the address of the domain name www.smartrtmpd.com is 192.168.1.1, which is the address where the smart_rtmpd server runs.

4.2 Configure smart_rtmpd server
Copy the certificate and private key generated above to the directory of smart_rtmpd (server 192.168.1.1). The following operation is on 192.168.1.1 where smart_rtmpd is running, not the machine where you generated the certificate. Open the configuration file config.xml

-<ssl>
  <serverca />
  <serverkey>server.key</serverkey>
  <servercert>server.crt</servercert>
  <clientca />
  <clientkey />
  <clientcert />
  </ssl>

-<http>
  <ip />
  <port>8080</port>
  <sport>8181</sport>
  <ssl>true</ssl>

Configure the certification path, open the ssl of the http server and configure the port, if there is no other requirement, just start the smart_rtmpd server

4.3 Run pure webrtc
Enter on the machine where you just configured the hosts file

https://www.smartrtmpd.com:8181/webrtc.html
Be sure to see clearly that it is https, so that you can see the corresponding webrtc operation interface, of course enter

http://www.smartrtmpd.com:8080/player.html
You will experience another powerful function of smart_rtmpd, which is h5, live broadcast, video and VOD functions!


# 问：期翼流服务器是哪方面的软件，有什么功能与优点

答：期翼流服务器（ smart_rtmpd ），是一款用于直播，录播性能卓越的服务器。如果您不理解，可以理解为和 nginx-rtmp, srs ，功能类似，但是性能比 nginx-rtmp 高很多，甚至比 srs 还要高的直播（录播）服务器，特点是跨平台，无任何依赖，性能卓越，部署和维护十分方便，解压既能运行。基本上主流的操作系统都可以做新版本，有需要的话，可以私下联系我。

# 问：smart_rtmpd 支持那些 OS? 

windows, ubuntn, centos, freebsd, arm 当然 docker 也是可以运行的。

# 问：smart_rtmpd performance 性能如何？

答：smart_rtmpd 的 rtmp, http-flv 能做到 1 秒之内，http-hls 经过参数调试可以做到 4 秒，如果做进一步优化，可以
做到 3 秒或更少。为什么我的配置不了那么好的性能？这个东西是全方面的支持，首先硬件要跟得上，CPU， 硬盘，内存，网络，其次就是参数调优，有兴趣的改善的可以私下联系我们，下面有我们的联系方式。

# 问：smart_rtmpd 能解决什么问题？

答：smart_rtmpd 服务器短小精悍，追求性能。能解决如下问题：
第三方库版本差异带来的问题，部署繁琐问题，后续升级维护兼容性繁琐的问题。
2. smart_rtmpd 性能比较高，针对不同平台，不同系统，推出相匹配以及最佳可配置的方案，保证系统的高性能运行。
不同的架构模式，适合不同的业务需求。
3. 解决了平台迁移问题，不同平台之间可以根据需要可以进行平台切换，比如：用户原来用的是 windows 系统，可以
平滑切换到 linux 系统下，数据格式统一。
4. smart_rtmpd 提供灵活的业务配置模式，无需升级程序即可根据配置满足不同的业务应用。
5. 支持集群的无限扩展以及热插拔，最大限度的保证系统运营状态下，平滑升级或维护系统。
6. 支持鉴权接口与验证。

# 问：smart_rtmpd download url 下载地址是？

答：http://www.qiyicc.com/download/rtmpd.zip


# 问：smart_rtmpd 怎么使用？

答：smart_rtmpd 无任何依赖，支持跨平台，解压既运行，或者根据需要简单修改一下 config.xml 文件，即可运行windows 平台下
1. 第一步下载软件包，解压 rtmpd.zip， 解压后得到 smart_rtmpd_win.zip，进一步解压 smart_rtmpd.zip ，即可得到 windows 的 smart_rtmpd 服务器
2. 运行 smart_rtmpd.exe 如下图，既表示成功
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_run.png?raw=true)
3. 推流验证，运行 ffmpeg.exe ( Windows下的 ffmpeg.exe 下载地址：https://ffmpeg.zeranoe.com/builds/ )
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_push.png?raw=true)
4. 播流验证
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play1.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play2.png?raw=true)


# 问：smart_rtmpd 支持那些输入，那些输出

答：smart_rtmp 支持推 rtmp(rtmps), rtsp(rtsps) 流，路径注入等方式输入；支持 rtmp(rtmps), http-flv(https-flv), http-hls(https-hls), mpeg-dash(https), mp4/ts(https), rtsp(rtsps) 方式的输出，同时也支持录像功能
也支持推送 h265 ，有关 codecId 可以通过 config.xml 进行配置，这样就可以对接任何客户端了，下一步需要支持 rtsp 输出。
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_stream.png?raw=true)

# 问：smart_rtmpd 支持级联吗？

答：支持云内集群以及云间级联，异常方便，还支持针对 URL 级别的级联方式（独创）
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_cluster.png?raw=true)

# 问：smart_rtmpd 的 rewrite 是怎么一回事？

答：比如中央电视台的体育节目购买版权后，地方点视台需要从央视体育购买转播权，可以通过 rewrite 方式，很轻松的把流授权和分发给地方电视台。无需更改任何软件。即可轻松实现。当然付费业务层，需要另外处理。
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_rewrite.png?raw=true)

# 问：smart_rtmpd 都是适应过那些端？

答：都是很多常用的终端，具体见下图
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_term.png?raw=true)

# 问：smart_rtmpd 压力测试如何？

答：具体见下图
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test1.png?raw=true)

# smart_webrtc example 使用说明：
	
参考博客
https://blog.csdn.net/freeabc/article/details/108561272


# 我们的联系方式:

| name |description|
|---|---|
|QQ |99766553 |
|QQ 群| 190583317, 300474021, 271191746 |
|WebChat(微信)|99766553|
|E-mail(邮箱)|cwf12345@sina.com|



