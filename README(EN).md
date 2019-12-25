Q: What kind of software is QIYI stream server, and what are its functions and advantages?

A: The smart wing server (smart_rtmpd) ​​is a server with excellent recording and broadcasting performance. If you do n’t understand, it can be understood as a function similar to nginx-rtmp, srs, but with a performance that is much higher than nginx-rtmp, and even higher than srs. It is a cross-platform, no dependency, Excellent performance, easy deployment and maintenance, decompression can run. Basically, the mainstream operating systems can make new versions. If necessary, you can contact me privately.

Q: What OS does smart_rtmpd support?

windows, ubuntn, centos, of course docker can also run. arm, can you contact me privately.

Answer: smart_rtmpd

Q: What is the name of the QIYI stream server?

Answer: smart_rtmpd

Q: How is smart_rtmpd performance?

Answer: Smart_rtmpd's rtmp, http-flv can be done within 1 second, http-hls can be adjusted for 4 seconds after parameter debugging, and if further optimized, 3 seconds or less can be achieved. Why can't my configuration be so good? This thing is full support. First of all, the hardware must keep up, CPU, hard disk, memory, network, and secondly, parameter tuning. If you are interested in improving, you can contact us privately. Below is our contact information.

Q: What problem does smart_rtmpd solve?

Answer: The smart_rtmpd server is short and powerful, and it is in pursuit of performance. Can solve the following problems:

smart_rtmpd is an independent program without any dependencies. It solves various problems encountered during deployment, environment dependencies, compatibility issues, configuration issues, problems caused by differences in third-party library versions, tedious deployment issues, and subsequent upgrades to maintain compatibility. Tedious questions.
smart_rtmpd has high performance. For different platforms and different systems, we launch matching and best configurable solutions to ensure high-performance operation of the system. Different architecture models are suitable for different business needs.
Solved the problem of platform migration. Different platforms can be switched as required. For example, if the user originally used the windows system, they can smoothly switch to the linux system and the data format is uniform.
smart_rtmpd provides flexible business configuration modes, which can be used to meet different business applications based on the configuration without the need to upgrade the program.
Supports unlimited expansion of clusters and hot-swappable, to ensure the smooth upgrade or maintenance of the system under system operation.
Support authentication interface and verification.
Q: What is the download address of smart_rtmpd?

Answer: http://www.qiyicc.com/download/rtmpd.rar

Q: How to use smart_rtmpd?

Answer: smart_rtmpd has no dependencies, supports cross-platform, unzips and runs, or simply modify the config.xml file as needed to run under the windows platform

The first step is to download the software package, decompress rtmpd.rar, decompress it to get smart_rtmpd_win.rar, and then decompress smart_rtmpd.rar to get the smart_rtmpd server for windows.
Run smart_rtmpd.exe as shown below, which indicates success image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_run.png?raw=true)
Push stream verification, run ffmpeg.exe (ffmpeg.exe under Windows Download: https://ffmpeg.zeranoe.com/builds/) image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_push.png?raw=true)
Streaming verification image image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play1.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_play2.png?raw=true)

Q: Smart_rtmpd supports those inputs and those outputs

A: smart_rtmp supports pushing rtmp stream, path injection, etc. input; supports rtmp, http-flv, http-hls, mpeg-dash, mp4 / ts output, and also supports video recording and push h265. The relevant codecId can be obtained through config.xml configuration, so that you can connect to any client, the next step needs to support rtsp output. image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_stream.png?raw=true)

Q: Does smart_rtmpd support cascading?

A: Supports intra-cloud clusters and inter-cloud cascading, which is extremely convenient. It also supports URL-level cascading methods (original) image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_cluster.png?raw=true)

Q: What is the rewrite of smart_rtmpd?

A: For example, after purchasing the copyright of CCTV sports programs, local TV stations need to purchase the broadcasting rights from CCTV Sports. You can easily authorize and distribute the streams to local TV stations through rewrite. No software changes are required. It's easy to achieve. Of course, the paid business layer needs to be handled separately. image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_rewrite.png?raw=true)

Q: Which terminals did smart_rtmpd adapt to?

A: There are many commonly used terminals, see the following image for details
![image](https://github.com/superconvert/smart_rtmpd/blob/master/smart_rtmpd_term.png?raw=true)

Q: How about the smart_rtmpd stress test?

Answer: For details, see the following image image image
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test.png?raw=true)
![image](https://github.com/superconvert/smart_rtmpd/blob/master/test1.png?raw=true)

Our contact information:

QQ: 99766553

QQ group: 190583317

WebChat (WeChat): 99766553

E-mail (email): cwf12345@sina.com
