# 局域网搭建 webrtc 测试

### 环境说明 ( environment )

| name | os | ip | software |
|---|---|---|---|
|客户端 (client) |windows (win10) |192.168.1.8 |chrome 浏览器, ffmpeg |
|服务器 (server) |Ubuntu 16.04.7 (LTS) |192.168.1.6 |smart_webrtc |

如果有防火墙 ( firewall ) ，麻烦首先关闭客户端 (client) 和服务器端 (server) 的防火墙!!!

### 制作步骤

1. 制作服务器端证书 （ client )
* 下载 https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-windows-arm64.exe 到 client，并重命名 mkcert-v1.4.4-windows-arm64.exe 为 mkcert.exe
* 执行如下命令：
    ```shell
    mkcert.exe www.smartwebrtc.com 192.168.1.6
    mkcert.exe install
    ```
    上述命令会产生两个文件 www.smartwebrtc.com.com+1.pem, www.smartwebrtc.com+1-key.pem， 重命名两个文件   
    ```shell
    www.smartwebrtc.com.com+1.pem -> server.crt  
    www.smartwebrtc.com+1-key.pem -> server.key  
    ```
* 拷贝 server.crt & server.key 到 server 上 smart_webrtc 所在的目录

2. 运行服务器端 ( server )
* 修改配置文件 config.xml
    ```shell
    <ssl>
        <serverca></serverca>
        <serverkey>server.key</serverkey>
        <servercert>server.crt</servercert>
        ... ...    
    </ssl>
    ... ...
    <http>
        <ip></ip>
        <!-- http 端口 -->
        <port>8080</port>
        <!-- https 端口, 必须 ssl 开启 -->
        <sport>8181</sport>
        <!-- webrtc 必须为 true -->
        <ssl>true</ssl>
        ... ...
    </http>
    ```
    注意 ssl 一定配置 serverkey 和 servercert， 对于 http 一定要配置 sport 和 ssl 为 true
* 运行 smart_webrtc
    ```shell
    ./smart_webrtc 
    ```

3. 进行推流 ( client )  
进行推流
    ```shell
    ffmpeg -re -stream_loop -1 -i 33.mp4 -vcodec libx264 -tune zerolatency -preset ultrafast  -bsf:v h264_mp4toannexb -g 15 -keyint_min 15 -profile:v baseline -level 3.1 -pix_fmt yuv420p -r 15 -acodec aac -f flv rtmp://192.168.1.6/live/stream
    ```

4. webrtc 进行播放 ( client )  
打开 chrome， 输入 url http://192.168.1.6:8080， 就会看到 webrtc 播放器界面，播放器最下面的输入框通常情况就是 "https://192.168.1.6:8181/live/stream.wms?type=getoffer"， 点击 "start" 按钮，理论上不出问题的话，就可以看到音视频画面里
