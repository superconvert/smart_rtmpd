# LiveShow 使用说明

* 系统的组成  
  LiveShow 的运行环境由三部分组成，服务器，客户端，web 网页端。 

  服务器：smart_rtmpd， 支持 Linux, Windows, FreeBSD, ARM 等平台运行  
  客户端：LiveShow 目前只支持 Windows 平台，具有推流，拉流的功能  
  WEB 端：目前支持 PC 端和 Android 端，iOS 可能支持，没做验证，推荐使用 chrome 和 edge  

* 运行顺序
  1. 首先启动服务器端 smart_rtmpd  
  2. 其次启动客户端，登录，进入会议室，并开始推流  
  3. 在浏览器中输入 smart_rtmpd 的 HTTP 服务的 URL: http://服务器地址:端口/liveshow.html 即可  

* 基本使用说明  
  用户登录时，需要填写 "用户名", "会议名", "密码"；其中 "用户名" 全局唯一，如果有重名，会登录失败, "会议名" 全局唯一，如果登录过程不存在，需要 "创建会议" 选项  
  默认系统是对用户和密码不做校验的，如果有验证的需要，需要注册软件，注册成功后，才能使用第三方鉴权接口进行鉴权业务。  

  非注册用户，目前最大支持 10 人登录，音视频时长 10 分钟，注册后，无限制。  

* 技术支持
  远程搭建演示环境并进行整体展示，单次服务： 300 元  
  接口定制和 OEM 价格根据工作量另算  

  QQ:   99766553  
  微信: 99766553  
  邮箱: cwf12345@sina.com  

# 服务器端说明

* 服务器端的下载  
下载对应的 rtmpd.zip 或 smart_rtmpd.zip 压缩包即可，压缩包内一般包含 Windows，Linux 或 ARM 软件包，普通用户直接运行 Windows 版本即可。  

  |WebSite|URL|
  |---|---|
  |官网 | http://www.qiyicc.com/download/rtmpd.zip |
  |github | https://github.com/superconvert/smart_rtmpd |
  |gitee | https://gitee.com/mirrors/smart-rtmpd |


* 服务器端配置
  服务器端运行非常简单，由于 smart_rtmpd 支持解压运行即可。但必须保证 HTTP 服务使能，如果开启 HTTPS 就必须配置对应的证书。对应的配置文件 config.xml 内，配置如下：

  ```shell
  <config>
      # 对于 LiveShow 用户的鉴权需要，需要配置鉴权服务器的信息，如果用户名为中文，则采用 url encoder 
      <authurl timeout="3000" router="/api"></authurl>
      # WebRTC 目前只支持 UDP , 对应的 UDP 端口必须配置
      <rtp min="30000" max="65535" que="20000" />
      # NAT 模式下使用，必须配置对应的映射地址，否则忽略不管
      <nat>
          # 外网地址或域名，不带端口
          <rtp>www.qiyicc.com</rtp>
      </nat>
      # HTTPS 服务必须配置证书
      <ssl>
          ... ...
          <serverkey>您的密钥</serverkey>
          <servercert>您的证书</servercert>
          ... ...
      </ssl>
      ... ...    
      # HTTP 必须开启
      <http>        
          # 开启 HTTP 服务
          <enable>true</enable>
      </http>
  </config>
  ```

  如果想快捷使用，对于 config 文件是不需要做任何更改的，直接运行即可。!!!  
  smart_rtmpd 默认的环境，满足 LiveShow 的正常运行，如果更高级应用，需要修改对应的配置  

# 客户端说明

* 客户端下载
  下载 liveShow.zip 压缩包即可    

  |WebSite|URL|
  |---|---|
  |官网 | http://www.qiyicc.com/download/liveshow.zip |
  |github | https://github.com/superconvert/smart_rtmpd |
  |gitee | https://gitee.com/mirrors/smart-rtmpd |

* 客户端运行
  把上述下载的压缩包，解压到一个固定的位置，运行 liveShow.exe 即可，第一次运行会弹出配置页面，主要是音视频相关的配置，还有服务器的地址配置。这些配置完毕，如果服务器正常运行情况下，  
  就会进入登录界面，填写 "用户名", "会议名", "密码" ( 随便填写，目前版本不做验证，为简易场景提供更方便的使用 )，如果是第一次进入会议，必须选择 "创建会议"，点登录即可，否则，直接登录即可；  
  登录成功后， 就能看到主界面了。根据需要进行投屏或视频，或文字聊天的需要了。--- 双击视频窗口，可以进行全屏的展示 ---

  服务器地址就是 smart_rtmpd 的 HTTP 服务地址，默认格式一般是：<您的服务器IP>:<8080>  

  如果客户端连接服务器不成功，首先确认服务器是否正常运行，对应的 HTTP（TCP） RTP (UDP) 是否正常运行，其次排查是否是防火墙的问题，有防火墙的情况下，需要放行 RTP 的端口和 HTTP 的端口  
  再次看看客户端是否填写错误，服务器地址是否多空格冗余字符，一般情况下软件都有对应的校验功能  
 
# WEB 端说明
  * WEB 端环境
  无论是电脑( PC )端还是手机端( Android )，推荐使用谷歌的 chrome 或微软的 edge 浏览器，对于 iOS 自行尝试，遇到问题可以私下联系官方进行排查。  

  * WEB 功能说明
  文字聊天只实现最基本的文字聊天，不支持 emoji ，有兴趣的朋友可以自己改造，不支持图片，文档，后续随产品升级会逐步丰富。  
  推流功能，后续会尝试升级 WEB 的推流功能，可能比较专业化的配置，如果有刚需，需要定制。

  * WEB 端登录
  WEB 端相对比较简单，smart_rtmpd 正常运行的情况下，假设服务器地址为 192.168.1.1 ，开启的端口 8080，那么在浏览器中输入 http://192.168.1.1:8080/liveshow.html 即可进入登录页面，输入"用户名"  
  "会议室"，"密码" 即可进入主界面， 每个视频窗口有最大化按钮，可以根据需要进行全屏的需要。

