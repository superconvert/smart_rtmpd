smart_rtmp 服务器，小巧，高效，布署及其简单。只有一个配置文件 config.xml，其它无没任何依赖！！！！！！

目前只提供了，CentOS ( 7.7.1908 core ), ubuntu ( 14.04 LTS，64 位 ) 和 windows 的测试版本。

windows 版本：smart_rtmpd_win.rar
ubuntu 协程版本：smart_rtmpd.coroutines.ubuntu14.04LTS.x64.tar.gz ( 推荐 ）
ubuntu 多线程版本：smart_rtmpd.multithread.ubuntu14.04LTS.x64.tar.gz
centos 协程版本：smart_rtmpd.coroutines.centos7.7.1908.x64.tar.gz ( 推荐 ）
centos 多线程版本：smart_rtmpd.multithread.centos7.7.1908.x64.tar.gz

性能应该超过 SRS !!!!!，如果发现问题，可以及时联系我 
QQ:   99766553,   微信同 QQ 号码
网站:  http://www.qiyicc.com
邮箱:  cwf12345@sina.com 

测试版本下载地址: 
http://www.qiyicc.com/download/rtmpd.rar

支持 rtmp ，http-flv 和 http-hls 协议
支持 vhost ，支持无限级联，支持 rewrite rtmp url 可以拓展很多丰富的功能!!!!!

如果 rtmp 协议 url 为 rtmp://192.168.1.1:1935/live/stream
那么对应的 http-flv 协议 url 为 http://192.168.1.1:8080/live/stream.flv
那么对应的 http-hls 协议 url 为 http://192.168.1.1:8080/live/stream.m3u8

支持 app 为 live 标签，别的暂且不支持，比如：这样的推流是正确的 
ffmpeg.exe -re -stream_loop -1 -i 33.mp4 -c copy -f flv rtmp://192.168.1.1:1935/live/stream
