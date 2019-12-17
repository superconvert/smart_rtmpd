问：期翼流服务器名字叫什么？

答：smart_rtmpd


问：smart_rtmpd 性能如何？

答：smart_rtmpd 的 rtmp, http-flv 能做到 1 秒之内，http-hls 经过参数调试可以做到 4 秒，如果做进一步优化，可以
做到 3 秒或更少。为什么我的配置不了那么好的性能？这个东西是全方面的支持，首先硬件要跟得上，CPU， 硬盘，内存，网络，其次就是参数调优，有兴趣的改善的可以私下联系我们，下面有我们的联系方式。


问：smart_rtmpd 能解决什么问题？

答：smart_rtmpd 服务器短小精悍，追求性能。能解决如下问题：
1. smart_rtmpd 是独立程序，无任何依赖，解决了，部署过程中遇到的种种问题，环境依赖问题，兼容问题，配置问题，
第三方库版本差异带来的问题，部署繁琐问题，后续升级维护兼容性繁琐的问题。
2. smart_rtmpd 性能比较高，针对不同平台，不同系统，推出相匹配以及最佳可配置的方案，保证系统的高性能运行。
不同的架构模式，适合不同的业务需求。
3. 解决了平台迁移问题，不同平台之间可以根据需要可以进行平台切换，比如：用户原来用的是 windows 系统，可以
平滑切换到 linux 系统下，数据格式统一。
4. smart_rtmpd 提供灵活的业务配置模式，无需升级程序即可根据配置满足不同的业务应用。
5. 支持集群的无限扩展以及热插拔，最大限度的保证系统运营状态下，平滑升级或维护系统。
6. 支持鉴权接口与验证。

问：smart_rtmpd 下载地址是？

答：http://www.qiyicc.com/download/rtmpd.rar

问：smart_rtmpd 怎么使用？

答：smart_rtmpd 无任何依赖，支持跨平台，解压既运行，或者根据需要简单修改一下 config.xml 文件，即可运行windows 平台下
1. 第一步下载软件包，解压 rtmpd.rar， 解压后得到 smart_rtmpd_win.rar，进一步解压 smart_rtmpd.rar ，即可得到 windows 的 smart_rtmpd 服务器
2. 运行 smart_rtmpd.exe 如下图，既表示成功
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_run.png?raw=true)
3. 推流验证，运行 ffmpeg.exe ( Windows下的 ffmpeg.exe 下载地址：https://ffmpeg.zeranoe.com/builds/ )
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_push.png?raw=true)
4. 播流验证
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play1.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play2.png?raw=true)


问：smart_rtmpd 支持那些输入，那些输出

答：smart_rtmp 支持推 rtmp 流，路径注入等方式输入；支持 rtmp, http-flv, http-hls, mpeg-dash, mp4/ts 方式的输出，同时也支持录像功能
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_stream.png?raw=true)

问：smart_rtmpd 支持级联吗？

答：支持云内集群以及云间级联，异常方便，还支持针对 URL 级别的级联方式（独创）
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_cluster.png?raw=true)

问：smart_rtmpd 的 rewrite 是怎么一回事？

答：比如中央电视台的体育节目购买版权后，地方点视台需要从央视体育购买转播权，可以通过 rewrite 方式，很轻松的把流授权和分发给地方电视台。无需更改任何软件。即可轻松实现。当然付费业务层，需要另外处理。
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_rewrite.png?raw=true)

问：smart_rtmpd 都是适应过那些端？

答：都是很多常用的终端，具体见下图
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_term.png?raw=true)

问：smart_rtmpd 压力测试如何？

答：具体见下图
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test1.png?raw=true)


我们的联系方式:

QQ : 99766553
QQ 群 : 190583317
WebChat(微信) : 99766553
E-mail(邮箱) : cwf12345@sina.com



