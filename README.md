smart_rtmpd description
-------

You can translate documents from Chinese to English through Google Translate！！！
    
   smart_webrtc download url : 
   -------    
        see github directory smart_webrtc or download from below url
        url : https://pan.baidu.com/s/13RxwyJQtpD2iBssOdICfSQv  , password : gq6m    
                
   build ffmpeg support rtmps, see this link:
   -------
        https://www.iiwnz.com/compile-ffmpeg-with-rtmps-for-facebook/
        you can play rtmps with vlc.
    
   smart rtmpd download url:
   -------
        http://www.qiyicc.com/download/rtmpd.zip

   support protocol:
   -------    
        push stream              pull stream      
        rtmp[s] ---> server ---> rtmp[s], http[s]-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc 
        rtsp[s] ---> server ---> rtmp[s], http[s]-flv, http[s]-hls, https[s]-dash, rtsp[s], webrtc 
      
    
   media codec:
   -------
    
        video codec:              audio codec:
        h264, h265                aac
        vp8 ( webrtc )            opus ( webrtc )        
    
   rtmp url :    
   -------
    
        right format:
        rtmp://xxx.xxx.xxx.xxx:port/live/stream, 
        rtmp://xxx.xxx.xxx.xxx:port/rec/stream
        only support live or rec app tag .
      
        wrong format:
        rmtp://xxx.xxx.xxx.xxx:port/abc/stream, rmtp://xxx.xxx.xxx.xxx:port/sky/stream, ... ...
        not support abc, sky or other format app tag !!!!!!!
      
   push stream :
   -------
   
        ffmpeg push rtmp stream      
        1. ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.105:8554/live/stream1
        2. ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.105:8554/live/stream2
        3. ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f flv rtmp://192.168.1.105:9554/live/stream1
        4. ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f flv rtmp://192.168.1.105:9554/live/stream2
      
        ffmpeg push rtsp stream
        1. ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f rtsp rtsp://192.168.1.105:8554/live/stream1
        2. ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f rtsp rtsp://192.168.1.105:8554/live/stream2
        3. ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f rtsp rtsp://192.168.1.105:9554/live/stream1
        4. ffmpeg -re -i my265.mkv -vcodec libx265 -acodec aac -f rtsp rtsp://192.168.1.105:9554/live/stream2     
	
        ffmpeg push srt stream
        1. ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f mpegts srt://192.168.1.105:9000?streamid=192.168.1.105:9000/live/stream,role=publisher

        ffmpeg play srt stream
        1. ffplay srt://192.168.1.105:9000?streamid=192.168.1.105:9000/live/stream,role=player
      
   REC ( recorder ) :   
   -------
   
        you can use recorder function. change app tag from live to rec, live ---> rec, see below :
        ffmpeg -re -i my.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.105:8554/rec/stream
   
        you can browse url : http://192.168.1.102:8080/rec/stream?cmd=query，  smart_rtmpd will return recorder list :
   
       		2020-09-19
       		2020-09-20
       		2020-09-21
   
        the recorder list include the day rec files .   
        you can browse url : http://192.168.1.102:8080/rec/stream?cmd=query&day=2020-09-20, smart_rtmpd will return media index file :   
      		21-41-06.mpd      or     21-41-06.m3u8
      		21-40-05.mpd             21-40-05.m3u8
      		21-39-05.mpd             21-39-05.m3u8
   
        you can use player replay this video   
        ffplay http://192.168.1.102:8080/rec/stream.mpd?day=2020-09-20&time=21-41-06       
        ffplay http://192.168.1.102:8080/rec/stream.m3u8?day=2020-09-20&time=21-41-06  

   download file :
   -------
        1. you put file into vod directory, for example: test.mp4
        2. in browser you can download it from url http://ip:port/vod/test.mp4

   nat map mode :
   -------   
   ![image](https://github.com/superconvert/smart_rtmpd/blob/master/nat.png)
   	 
   	 outer user can push stream rtmp://61.180.166.16/live/stream, inner user can play with rtmp://192.168.1.1/live/stream
      
   thirdparty auth url :
   -------
   
   	see this link : https://blog.csdn.net/freeabc/article/details/105781985
	you can modify config.xml file 
	
	<authurl>192.168.1.32:8181</authurl>
	
	192.168.1.32:8181 is your auth http server url， if you want push a stream rtmp://192.168.1.1/live/stream?user=admin&token=xqtv312,
	smart_rtmpd will send http put request http://192.168.1.32:8181/live/stream?user=admin&token=xqtv312&type=rtmp&role=publisher to your auth http server.
	http url param type : rtmp, http, rtsp, etc.  ( protocol )       
	http url param role : publisher (push stream) or player ( pull stream )
	
	if you have below http play request :
		http://192.168.1.1/live/stream.flv?user=admin&token=xqtv312 ( http-flv )
		http://192.168.1.1/live/stream.m3u8?user=admin&token=xqtv312 ( http-m3u8 )
		http://192.168.1.1/live/stream.mpd?user=admin&token=xqtv312 ( http-mpd )
		
	smart_rtmpd will send http url auth to auto server :
		http://192.168.1.32:8181/live/stream.flv?user=admin&token=xqtv312&type=rtmp&role=player
		http://192.168.1.32:8181/live/stream.m3u8?user=admin&token=xqtv312&type=rtmp&role=player
		http://192.168.1.32:8181/live/stream.mpd?user=admin&token=xqtv312&type=rtmp&role=player
		
	verify success return HTTP 200 OK, other be failed.
	
	for more safe auth verify :
	smart_rtmpd  --- http ---> proxy  --- https ---> auth server ， you can use sample proxy module first process auth request, and then forward request to your 
	auth http server.
     
      
   build cluster or cdn distribution :
   -------
   
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
    
  forward thirtparty :
  -------
  
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
    
//----------------------------------------------------------------------------------------------------

web portal
-------
  web browser <-------> nodejs server ( source code ) <----> smart_rtmpd
  see https://github.com/superconvert/smart_rtmpd/tree/master/web/src
  
  web interface :
  https://github.com/superconvert/smart_rtmpd/blob/master/web/src/web%20interface.txt
    
//----------------------------------------------------------------------------------------------------

smart_webrtc description
-------

1. download smart_webrtc.zip from github.

2. unzip it, unzip smart_webrtc_win.zip

3. run smart_webrtc.exe, if your ip is 192.168.1.1

4. push rtmp stream to smart_webrtc.exe

   ffmpeg.exe -re -i oceans.mp4 -vcodec libx264 -acodec aac -f flv rtmp://192.168.1.1/live/stream

5. open chrome browse, input url :  https://192.168.1.1

6. in web player edit input 192.168.1.1, click play button.

//----------------------------------------------------------------------------------------------------

问：期翼流服务器是哪方面的软件，有什么功能与优点
-------

答：期翼流服务器（ smart_rtmpd ），是一款用于直播，录播性能卓越的服务器。如果您不理解，可以理解为和 nginx-rtmp, srs ，功能类似，但是性能比 nginx-rtmp 高很多，甚至比 srs 还要高的直播（录播）服务器，特点是跨平台，无任何依赖，性能卓越，部署和维护十分方便，解压既能运行。基本上主流的操作系统都可以做新版本，有需要的话，可以私下联系我。

问：smart_rtmpd 支持那些 OS? 
-------

windows, ubuntn, centos, 当然 docker 也是可以运行的。arm 吗，可以私下联系我。

答：smart_rtmpd

问：期翼流服务器名字叫什么？
-------

答：smart_rtmpd


问：smart_rtmpd 性能如何？
-------

答：smart_rtmpd 的 rtmp, http-flv 能做到 1 秒之内，http-hls 经过参数调试可以做到 4 秒，如果做进一步优化，可以
做到 3 秒或更少。为什么我的配置不了那么好的性能？这个东西是全方面的支持，首先硬件要跟得上，CPU， 硬盘，内存，网络，其次就是参数调优，有兴趣的改善的可以私下联系我们，下面有我们的联系方式。


问：smart_rtmpd 能解决什么问题？
-------

答：smart_rtmpd 服务器短小精悍，追求性能。能解决如下问题：
第三方库版本差异带来的问题，部署繁琐问题，后续升级维护兼容性繁琐的问题。
2. smart_rtmpd 性能比较高，针对不同平台，不同系统，推出相匹配以及最佳可配置的方案，保证系统的高性能运行。
不同的架构模式，适合不同的业务需求。
3. 解决了平台迁移问题，不同平台之间可以根据需要可以进行平台切换，比如：用户原来用的是 windows 系统，可以
平滑切换到 linux 系统下，数据格式统一。
4. smart_rtmpd 提供灵活的业务配置模式，无需升级程序即可根据配置满足不同的业务应用。
5. 支持集群的无限扩展以及热插拔，最大限度的保证系统运营状态下，平滑升级或维护系统。
6. 支持鉴权接口与验证。

问：smart_rtmpd 下载地址是？
-------

答：http://www.qiyicc.com/download/rtmpd.zip


问：smart_rtmpd 怎么使用？
-------

答：smart_rtmpd 无任何依赖，支持跨平台，解压既运行，或者根据需要简单修改一下 config.xml 文件，即可运行windows 平台下
1. 第一步下载软件包，解压 rtmpd.zip， 解压后得到 smart_rtmpd_win.zip，进一步解压 smart_rtmpd.zip ，即可得到 windows 的 smart_rtmpd 服务器
2. 运行 smart_rtmpd.exe 如下图，既表示成功
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_run.png?raw=true)
3. 推流验证，运行 ffmpeg.exe ( Windows下的 ffmpeg.exe 下载地址：https://ffmpeg.zeranoe.com/builds/ )
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_push.png?raw=true)
4. 播流验证
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play1.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play2.png?raw=true)


问：smart_rtmpd 支持那些输入，那些输出
-------

答：smart_rtmp 支持推 rtmp(rtmps), rtsp(rtsps) 流，路径注入等方式输入；支持 rtmp(rtmps), http-flv(https-flv), http-hls(https-hls), mpeg-dash(https), mp4/ts(https), rtsp(rtsps) 方式的输出，同时也支持录像功能
也支持推送 h265 ，有关 codecId 可以通过 config.xml 进行配置，这样就可以对接任何客户端了，下一步需要支持 rtsp 输出。
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_stream.png?raw=true)

问：smart_rtmpd 支持级联吗？
-------

答：支持云内集群以及云间级联，异常方便，还支持针对 URL 级别的级联方式（独创）
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_cluster.png?raw=true)

问：smart_rtmpd 的 rewrite 是怎么一回事？
-------
答：比如中央电视台的体育节目购买版权后，地方点视台需要从央视体育购买转播权，可以通过 rewrite 方式，很轻松的把流授权和分发给地方电视台。无需更改任何软件。即可轻松实现。当然付费业务层，需要另外处理。
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_rewrite.png?raw=true)

问：smart_rtmpd 都是适应过那些端？
-------
答：都是很多常用的终端，具体见下图
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_term.png?raw=true)

问：smart_rtmpd 压力测试如何？
-------
答：具体见下图
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test1.png?raw=true)

smart_webrtc 使用说明：
-------
参考博客
https://blog.csdn.net/freeabc/article/details/108561272


我们的联系方式:
-------
QQ : 99766553

QQ 群 : 190583317

WebChat(微信) : 99766553

E-mail(邮箱) : cwf12345@sina.com



