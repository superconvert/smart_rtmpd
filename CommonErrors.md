# Smart_Rtmpd ( Smart_WebRTC ) Common Errors ( 常见错误 ）

### Windows 

None 

### Linux 
1. Start srt server failed! ( 启动 srt 服务器失败 ）
~~~shell
Q:
root@CMZL-60-112:~/new/bin# ./smart_webrtc 
8CC7E740 [25-01- 1 17:14:47.142] I: smart_webrtc --- build time : 2024-12-20 09:48:16
8CC7E740 [25-01- 1 17:14:47.142] I: website url : http://www.qiyicc.com/download/rtmpd.zip
8CC7E740 [25-01- 1 17:14:47.142] I: gitee url : https://gitee.com/mirrors/smart-rtmpd
8CC7E740 [25-01- 1 17:14:47.142] I: github url : https://github.com/superconvert/smart_rtmpd
8CC7E740 [25-01- 1 17:14:47.142] I: liveshow url : https://github.com/superconvert/smart_rtmpd/blob/master/liveshow.md
8CC7E740 [25-01- 1 17:14:47.142] I: development url : https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md
8CC7E740 [25-01- 1 17:14:47.142] I: examples url : https://github.com/superconvert/smart_rtmpd/tree/master/example
8CC7E740 [25-01- 1 17:14:47.142] I: email : cwf12345@sina.com
8CC7E740 [25-01- 1 17:14:47.142] I: webchat : 99766553, qq : 99766553
8CC7E740 [25-01- 1 17:14:47.143] I: 110.40.64.224 eth0
8CC7E740 [25-01- 1 17:14:47.165] I: ssl client no config.
8CC7E740 [25-01- 1 17:14:47.165] I: ssl server no config.
8CC7E740 [25-01- 1 17:14:47.179] I: the rtmp server ip: 0.0.0.0, port is: 1935
8CC7E740 [25-01- 1 17:14:47.234] I: the http server ip: 0.0.0.0, port is: 8080
8CC7E740 [25-01- 1 17:14:47.234] I: the http url http://110.40.64.224:8080
8CC7E740 [25-01- 1 17:14:47.249] I: the turn server ip: 0.0.0.0, port is: 8888
generating new self-signed cert for smart_rtmpd@qiyicc.com
8CC7E740 [25-01- 1 17:14:47.278] I: rtc-manager build self-signed certificate.
8CC7E740 [25-01- 1 17:14:47.279] I: the rtsp server ip: 0.0.0.0, port is: 8554
8CC7E740 [25-01- 1 17:14:47.280] I: the srt server ip: 0.0.0.0, port is: 9000
8CC7E740 [25-01- 1 17:14:47.280] I: srt bind socket failed(Connection setup failure)
A:
oot@CMZL-60-112:~/new/bin# ulimit -n 65535                                                        <--- change ulimit(open files)
root@CMZL-60-112:~/new/bin# ./smart_webrtc 
65F0F740 [25-01- 1 17:25:58.735] I: smart_webrtc --- build time : 2024-12-20 09:48:16
65F0F740 [25-01- 1 17:25:58.735] I: website url : http://www.qiyicc.com/download/rtmpd.zip
65F0F740 [25-01- 1 17:25:58.735] I: gitee url : https://gitee.com/mirrors/smart-rtmpd
65F0F740 [25-01- 1 17:25:58.735] I: github url : https://github.com/superconvert/smart_rtmpd
65F0F740 [25-01- 1 17:25:58.735] I: liveshow url : https://github.com/superconvert/smart_rtmpd/blob/master/liveshow.md
65F0F740 [25-01- 1 17:25:58.735] I: development url : https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md
65F0F740 [25-01- 1 17:25:58.735] I: examples url : https://github.com/superconvert/smart_rtmpd/tree/master/example
65F0F740 [25-01- 1 17:25:58.735] I: email : cwf12345@sina.com
65F0F740 [25-01- 1 17:25:58.735] I: webchat : 99766553, qq : 99766553
65F0F740 [25-01- 1 17:25:58.736] I: 110.40.64.224 eth0
65F0F740 [25-01- 1 17:25:58.757] I: ssl client no config.
65F0F740 [25-01- 1 17:25:58.758] I: ssl server no config.
65F0F740 [25-01- 1 17:25:58.771] I: the rtmp server ip: 0.0.0.0, port is: 1935
65F0F740 [25-01- 1 17:25:58.828] I: the http server ip: 0.0.0.0, port is: 8080
65F0F740 [25-01- 1 17:25:58.828] I: the http url http://110.40.64.224:8080
65F0F740 [25-01- 1 17:25:58.848] I: the turn server ip: 0.0.0.0, port is: 8888
generating new self-signed cert for smart_rtmpd@qiyicc.com
65F0F740 [25-01- 1 17:25:58.883] I: rtc-manager build self-signed certificate.
65F0F740 [25-01- 1 17:25:58.883] I: the rtsp server ip: 0.0.0.0, port is: 8554
65F0F740 [25-01- 1 17:25:58.913] I: the srt server ip: 0.0.0.0, port is: 9000
65F0F740 [25-01- 1 17:25:58.914] I: the sip server ip: 0.0.0.0, port is: 5060
65F0F740 [25-01- 1 17:25:58.916] I: the ims server disable
65F0F740 [25-01- 1 17:25:58.919] I: rtmp-manager add watch.
~~~

2. Start sip server failed! ( 启动 sip 服务器失败 ）
~~~shell
Q:
root@CMZL-60-112:~/new/bin# ./smart_webrtc 
724A1740 [25-01- 1 17:30:21.103] I: smart_webrtc --- build time : 2024-12-20 09:48:16
724A1740 [25-01- 1 17:30:21.103] I: website url : http://www.qiyicc.com/download/rtmpd.zip
724A1740 [25-01- 1 17:30:21.103] I: gitee url : https://gitee.com/mirrors/smart-rtmpd
724A1740 [25-01- 1 17:30:21.103] I: github url : https://github.com/superconvert/smart_rtmpd
724A1740 [25-01- 1 17:30:21.103] I: liveshow url : https://github.com/superconvert/smart_rtmpd/blob/master/liveshow.md
724A1740 [25-01- 1 17:30:21.103] I: development url : https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md
724A1740 [25-01- 1 17:30:21.103] I: examples url : https://github.com/superconvert/smart_rtmpd/tree/master/example
724A1740 [25-01- 1 17:30:21.103] I: email : cwf12345@sina.com
724A1740 [25-01- 1 17:30:21.103] I: webchat : 99766553, qq : 99766553
724A1740 [25-01- 1 17:30:21.103] I: 110.40.64.224 eth0
724A1740 [25-01- 1 17:30:21.125] I: ssl client no config.
724A1740 [25-01- 1 17:30:21.126] I: ssl server no config.
724A1740 [25-01- 1 17:30:21.141] I: the rtmp server ip: 0.0.0.0, port is: 1935
724A1740 [25-01- 1 17:30:21.199] I: the http server ip: 0.0.0.0, port is: 8080
724A1740 [25-01- 1 17:30:21.199] I: the http url http://110.40.64.224:8080
724A1740 [25-01- 1 17:30:21.215] I: the turn server ip: 0.0.0.0, port is: 8888
generating new self-signed cert for smart_rtmpd@qiyicc.com
724A1740 [25-01- 1 17:30:21.255] I: rtc-manager build self-signed certificate.
724A1740 [25-01- 1 17:30:21.255] I: the rtsp server ip: 0.0.0.0, port is: 8554
724A1740 [25-01- 1 17:30:21.256] I: the srt server disable
724A1740 [25-01- 1 17:30:21.256] I: the sip server ip: 0.0.0.0, port is: 5060
724A1740 [25-01- 1 17:30:21.256] I: exosip initialize failed(-1)
A:
root@CMZL-60-112:~/new/bin# ulimit -n 65535                                                      <--- change ulimit(open files)
root@CMZL-60-112:~/new/bin# ./smart_webrtc 
CCF12740 [25-01- 1 17:30:57.967] I: smart_webrtc --- build time : 2024-12-20 09:48:16
CCF12740 [25-01- 1 17:30:57.967] I: website url : http://www.qiyicc.com/download/rtmpd.zip
CCF12740 [25-01- 1 17:30:57.967] I: gitee url : https://gitee.com/mirrors/smart-rtmpd
CCF12740 [25-01- 1 17:30:57.967] I: github url : https://github.com/superconvert/smart_rtmpd
CCF12740 [25-01- 1 17:30:57.967] I: liveshow url : https://github.com/superconvert/smart_rtmpd/blob/master/liveshow.md
CCF12740 [25-01- 1 17:30:57.967] I: development url : https://github.com/superconvert/smart_rtmpd/blob/master/web_dev.md
CCF12740 [25-01- 1 17:30:57.967] I: examples url : https://github.com/superconvert/smart_rtmpd/tree/master/example
CCF12740 [25-01- 1 17:30:57.967] I: email : cwf12345@sina.com
CCF12740 [25-01- 1 17:30:57.967] I: webchat : 99766553, qq : 99766553
CCF12740 [25-01- 1 17:30:57.967] I: 110.40.64.224 eth0
CCF12740 [25-01- 1 17:30:57.989] I: ssl client no config.
CCF12740 [25-01- 1 17:30:57.989] I: ssl server no config.
CCF12740 [25-01- 1 17:30:58.002] I: the rtmp server ip: 0.0.0.0, port is: 1935
CCF12740 [25-01- 1 17:30:58.048] I: the http server ip: 0.0.0.0, port is: 8080
CCF12740 [25-01- 1 17:30:58.048] I: the http url http://110.40.64.224:8080
CCF12740 [25-01- 1 17:30:58.061] I: the turn server ip: 0.0.0.0, port is: 8888
generating new self-signed cert for smart_rtmpd@qiyicc.com
CCF12740 [25-01- 1 17:30:58.179] I: rtc-manager build self-signed certificate.
CCF12740 [25-01- 1 17:30:58.180] I: the rtsp server ip: 0.0.0.0, port is: 8554
CCF12740 [25-01- 1 17:30:58.200] I: the srt server disable
CCF12740 [25-01- 1 17:30:58.200] I: the sip server ip: 0.0.0.0, port is: 5060
CCF12740 [25-01- 1 17:30:58.201] I: the ims server disable
CCF12740 [25-01- 1 17:30:58.202] I: rtmp-manager add watch.
~~~
