# smart rtmpd 简介
smart_rtpmd 是一款用于直播，录播性能卓越的服务器。如果您不理解，可以理解为和 nginx-rtmp, srs ，并与此功能类似，特点是性能卓越，跨平台，无依赖，部署和维护十分方便，解压既能运行。  
smart rtmpd is a streaming media server. It can run on multiple systems ubuntu, centos, freebsd, windows & arm64. It is small, independent, easy to deploy, and has high performance. 

### 说明
* 免费软件 ( 不开源 )
* 允许商业应用 ( 保留我们的 logo 和 name )
* 源码授权 [ 只限公司 ]，可以私下联系我 ( webchat: 99766553, qq: 99766553, email: cwf12345@sina.com )

### 特点
* 性能是我们追求的目标，个人认为 smart_rtmpd 性能相对不错
* 部署简单，解压及运行，无需过渡配置
* 兼容性特强，windows, linux, freebsd, arm64 主流系统，都满足运行条件
* 软件大小相对比较小，即使是嵌入式设备也能满足布署 
* 支持 web 开发接口
* 支持集群，级联

### 支持哪些 OS
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

# smart rtmpd 支持哪些音视频编码

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
3. 推流验证，运行 ffmpeg.exe ( Windows下的 ffmpeg.exe 下载地址：https://github.com/BtbN/FFmpeg-Builds/releases )
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_push.png?raw=true)
4. 播流验证
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play1.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play2.png?raw=true)

### 例子 ( example )
|说明 |链接 |
|---|---|
|推拉流 ( pull/pull stream ) |https://github.com/superconvert/smart_rtmpd/tree/master/example|
|web接口 ( web interface ) |https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md |
|auth接口 ( web authentication ) |https://github.com/superconvert/smart_rtmpd/blob/master/web_auth.md |
|集群 |待续 ... |
|webrtc |https://github.com/superconvert/smart_rtmpd/blob/master/webrtc.md |
|webrtc im |https://github.com/superconvert/smart_rtmpd/blob/master/webrtc_im.md |
|录像 ( recording ) |https://blog.csdn.net/freeabc/article/details/103360588 |
|nat模式 ( nat mode ) |https://blog.csdn.net/freeabc/article/details/113446129 |
|重写 ( rewrite ) |待续 ... |
|vod配置 ( vod config)|待续 ... |

### 推拉流
https://blog.csdn.net/freeabc/article/details/117403471?spm=1001.2014.3001.5501

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
     
     you can modify policy.xml file
     ... ...
     ... ...
     <urls>			
         <url name="rtmp://www.qiyicc.com/live/sport">	    
	    <forward rewrite="rtmp://www.espn.com/live/sport">54.230.173.30:1935</forward>			
	    <forward rewrite="rtmps://www.espn.com/live/sport">54.230.173.32:1935</forward>
	    <forward></forward>
	 </url>
     </urls>
    
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

