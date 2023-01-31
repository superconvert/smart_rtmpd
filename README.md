# smart rtmpd 简介
smart_rtpmd 是一款用于直播，录播性能卓越的服务器。如果您不理解，可以理解为和 nginx-rtmp, srs ，并与此功能类似，特点是性能卓越，跨平台，无依赖，部署和维护十分方便，解压既能运行。  
smart rtmpd is a streaming media server. It can run on multiple systems ubuntu, centos, freebsd, windows & arm64. It is small, independent, easy to deploy, and has high performance. 

### 说明
* 免费软件 ( 不开源 )
* 允许商业应用 ( 保留我们的 logo 和 name )

### 特点
* 性能是我们追求的目标，个人认为 smart_rtmpd 性能相对不错
* 部署简单，解压及运行，无需过渡配置
* 兼容性特强，windows, linux, freebsd, arm64 主流系统，都满足运行条件
* 软件大小相对比较小，即使是嵌入式设备也能满足布署 
* 支持 web 开发接口
* 支持集群，级联

### 支持那些 OS
* Windows
* Linux ( Ubuntu, CentOS )
* FreeBSD
* ARM64
* Embedded system  
其中 Linux, FreeBSD 版本 支持多线程 ( multithread ) 和协程 ( coroutines )  
对于 docker 版本，直接拷贝 smart_rtmpd 到 docker 里面，直接运行即可  
理论上即使是自定制 linux 操作系统都能正常运行 smart_rtmpd

### 益处
最大的益处就是极大的节约您的运营成本，维护成本，迁移成本，
* 软件布署极其简单，解压即可运行，无第三方库依赖，解决了部署繁琐问题，兼容性问题，以及后续升级维护兼容性的问题
* 高性能是 smart rtmpd 追求的目标，尽量降低硬件要求，挖据硬件性能，极大的节约运营成本
* 配置通用化，windows 平台的配置可以轻松拷贝到 linux, arm, freebsd 反之亦然，数据格式统一化，满足迁移需求
* 灵活的布署模式，支持单服务器，集群，级联等多种模式，满足各种业务需求 ( rewrite )，也满足大规模布署的需要
* 支持热插拔，最大限度的保证系统运营状态下，平滑升级或维护系统
* 支持鉴权接口与验证，满足灵活的业务需求

# smart rtmpd 下载地址
|站点 |地址 |
|---|---|
|official |http://www.qiyicc.com/download/rtmpd.zip |
|github |https://github.com/superconvert/smart_rtmpd |
|gitee |https://gitee.com/mirrors/smart-rtmpd |

# smart rtmpd 支持那些音视频编码

### support media codec

| video codec | audio codec |
|---|---|
|h264, h265|aac|
|h264, h265|pcmu/pcma|
|vp8 ( webrtc )|opus ( webrtc )|
|h264 ( webrtc )|pcmu/pcma ( webrtc )|

### support protocol
| client | server | protocol |
|---|---|---|
|srt     |smart_rtmpd |rtmp[s], http[s]-flv, ws(s)-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc, srt|
|rtmp[s] |smart_rtmpd |rtmp[s], http[s]-flv, ws(s)-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc, srt|
|rtsp[s] |smart_rtmpd |rtmp[s], http[s]-flv, ws(s)-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc, srt|

### input & output detail

| input | video |	audio |	output |	rtmp	| rtsp( udp/tcp ) | flv( http/websocket ) |	hls	| dash |	srt | webrtc( video baseline level 3.1 ) |
|---|---|---|---|---|---|---|---|---|---|---|
|rtmp |h264 |pcma/pcmu | |yes	|yes |yes |only video |onlyvideo |only video |h264/vp8, pcma/pcmu |
|rtmp	|h264	|aac			 | |yes	|yes |yes |yes |yes |yes |h264/vp8, aac - opus	|
|rtmp	|hevc	|pcma/pcmu | |yes |yes |yes |only |video |only video |only video |only audio = pcma/pcmu	|
|rtmp	|hevc	|aac			 | |yes	|yes |yes |yes |yes	|yes |only audio = aac - opus |
|rtsp	|h264	|pcma/pcmu | |yes	|yes |yes	|only video	|only video	|only video	| h264/vp8, pcma/pcmu	|
|rtsp	|h264	|aac       | |yes	|yes |yes |yes |yes |yes |h264/vp8, aac - opus |
|rtsp	|hevc	|pcma/pcmu | |yes	|yes |yes	|only video	|only video	|only video	|only audio = pcma/pcmu	|
|rtsp |hevc	|aac       | |yes	|yes |yes |yes |yes |yes |only audio = aac - opus	|
|srt |h264	|aac       | |yes |yes |yes |yes |yes |yes	|h264/vp8, aac - opus	|
|srt |hevc	|aac       | |yes	|yes |yes |yes |yes |yes  |only audio = aac - opus |


### URL description
|URL |description |isok |
|---|---|---|
|rtmp://192.168.1.1:1935/live/stream   |live stream|yes |
|rtmp://192.168.1.1:1935/rec/stream    |record stream|yes |
|rmtp://192.168.1.1:1935/sky/camera    |bad format|no |
|rtsp://192.168.1.105:9554/live/music  |live stream|yes |
|rtsp://192.168.1.105:9554/rec/music   |live stream|yes |
|rtsp://192.168.1.105:9554/class/music |bad format|no |
|srt://192.168.1.105:9000/live/space   |record stream|yes |
|srt://192.168.1.105:9000/rec/space    |record stream|yes |
|srt://192.168.1.105:9000/record/space |bad format|no |

only support "live" or "rec" app tag, but no support "sky", "class" or "record" other app tag !!!


# 怎么使用 smart rtmpd

### 最快部署
1. 下载软件包，解压 rtmpd.zip， 解压后得到 windows 的 smart_rtmpd 服务器
2. 运行 smart_rtmpd.exe 如下图，既表示成功
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_run.png?raw=true)
3. 推流验证，运行 ffmpeg.exe ( Windows下的 ffmpeg.exe 下载地址：https://ffmpeg.zeranoe.com/builds/ )
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_push.png?raw=true)
4. 播流验证
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play1.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play2.png?raw=true)

### 例子 ( example )
|说明 |链接 |
|---|---|
|推拉流 ( pull/pull stream ) |https://github.com/superconvert/smart_rtmpd/tree/master/example|
|web接口 ( web interface ) |https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md |
|auth接口 ( web authentication ) |https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md |
|集群 |待续 ... |
|webrtc |https://blog.csdn.net/freeabc/article/details/108561272 |
|webrtc im |https://blog.csdn.net/freeabc/article/details/119793176 |
|录像 ( recording ) |https://blog.csdn.net/freeabc/article/details/103360588 |
|nat模式 ( nat mode ) |https://blog.csdn.net/freeabc/article/details/113446129 |
|rtmps支持 ( rtmps support ) |https://www.iiwnz.com/compile-ffmpeg-with-rtmps-for-facebook |
|重写 ( rewrite ) |待续 ... |
|vod配置 ( vod config)|待续 ... |

# build ffmpeg support rtmps, see this link:  
https://www.iiwnz.com/compile-ffmpeg-with-rtmps-for-facebook/  
you can play rtmps with vlc player.  

# smart rtmpd recorder stream
https://github.com/superconvert/smart_rtmpd/blob/master/recording.md

# smart rtmpd 商业支持
* 担心软件免费突然中断？  
这个您放心，我们原来是 IM 的， 那个几乎不挣钱，我们到现在还在坚持，
大家可以从网上搜一下 FreeCommunication ，存在多少年了 ( 18 年了 )。
毕竟这个我们的每个项目工程非常庞大，我们也投入很多精力和心血做好这
个事情，我相信我们要做优秀的产品，优秀的体验，是一种爱好，也是一种事业，
不会突然中断的，况且有这么多热爱的朋友大力支持！

* 遇到问题怎么办？  
我们一般不想收这个辛苦钱，但你们如果有技术支持的需要，我们还是提供技术支持的，这个
也请您放心，也支持软件定制 ( OEM )。如果您热心支持我们，我们表示感谢也非常乐意。

* 你们做这个的目的不为钱为什么？  
谁说我们不为钱，任何软件的初衷都是为了钱，精确的说价值。我们也不例外，肯定想挣钱。
但国内靠这个赚钱太难太难，我们基本上也是不挣钱。我们既然免费了，也不想靠这个挣钱。
我们的目的就是让软件名气更大，能拉到融资，有了融资，软件就更强大。也希望热爱的朋友
参与进来，形成一个生态圈，只要能力被认可，后续看发展而定，肯定有回报。

# 联系方式
| name |description|
|---|---|
|QQ |99766553 |
|QQ 群 |190583317, 300474021, 271191746 |
|WebChat(微信) |99766553 |
|E-mail(邮箱) |cwf12345@sina.com |
   
# smart rtmpd live stream
 
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
```bash
smart_rtmpd  --- http ---> proxy  --- https ---> auth server
```
you can use sample proxy module first process auth request, and then forward request to your 
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
  
  web development interface :
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

# webrtc im description

1. Why is it called im webrtc?
We know that the extended version of smart_rtmpd is called smart_webrtc, which already supports the webrtc function; however, the function of webrtc here only refers to push streaming through rtmp, rtsp, srt protocols, and smart_webrtc transcodes the video through the media layer video (h264 ---> vp8 ) And audio (aac ---> opus) to achieve this function, currently only supports H5 streaming in webrtc mode.

The webrtc im function here is the webrtc im function, which is parallel to the existing smart_rtmpd function. There is no interaction between them, there is no intercommunication and transcoding. That is to say, rtmp, rtsp, srt are mutually converted, and there is no connection between webrtc im and them, including signaling and media data.

2. What are the advantages of webrtc im?
webrtc im functions are all realized through web pages. As long as the browser version supports webrtc functions, it can meet your requirements and further realize your requirements on this basis. This greatly adapts to almost all devices, compatibility issues, and environmental problems are almost no longer obstacles! ! !

webrtc im deployment is more convenient, as long as you configure smart_rtmpd and click Run, you only need to open the browser and enter the URL on the front end, and all your needs can be met. This greatly simplifies your various configuration troubles, compatibility issues, and environmental settings, all of which are thrown aside.

3. What functions does webrtc im have?
Account login, online list/user search, message chat, peer audio and video (webrtc p2p)

Chat room list, chat room search, chat room entry, chat room user list, chat room user online notification, user show list, user show notification, chat room group chat, chat room audio and video (webrtc sfu)

4. How to use the webrtc im function of smart_rtmpd
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

4.3 Run webrtc im
Enter on the machine where you just configured the hosts file

https://www.smartrtmpd.com:8181/webrtc.html
Be sure to see clearly that it is https, so that you can see the corresponding webrtc operation interface, of course enter

http://www.smartrtmpd.com:8080/player.html
You will experience another powerful function of smart_rtmpd, which is h5, live broadcast, video and VOD functions!


