# smart_web 操作手册

### 1. smart_web 是什么？

smart_web 是 smart_rtmpd 的付费版本，拥有比免费版本更多的功能支持，基于 web 的管理方式，让您随时随地在大部分设备上都能远程对服务器进行维护管理。smart_web 带有进程守护，让您的业务不间断服务提供了保证。不管怎么说，smart_web 可以让您对 smart_rtmpd 的使用更加便捷，同时也节约您的时间成本和维护成本，对您的业务持续运行更加友好。

### 2. smart_web 支持哪些系统

| OS | 版本 | 架构 |
|---|---|---|
| windows | win10 | x64 |
| windows | win11 | x64 |
| windows | >= win2016 | x64 |
| ubuntu | >= 16.4 | x64 |
| debian | >= 11.0 | x64 |
| redhat | >= 7.9 | x64 |
| centos | >= 7.9 | x64 |
| freebsd | >= 14 | x64 |
| Embedded System | 内核版本 >= 4.15.0 | arm64 |

### 3. smart_web 怎么购买
smart_web 授权是注册码的形式提供服务的，是绑定服务器硬件的，更换服务器硬件必须重新购买软件授权，请用户须知！！！  
批量授权可以给予适当的优惠，望大家多多支持，您的支持就是我们前进的基石，同时官方也提供基础的技术支持服务，轻服务每个月 1200 元，包括软件升级，故障排查。定制化服务需根据工作量而定，具体需和官方进行协商  

| 联系方式 | 详情 |
|---|---|
| e-mail | cwf12345@sina.com |
| 微信 | 99766553 |
| QQ | 99766553 |
| Skype | https://join.skype.com/invite/ufwEVORZO1bZ |


### 4. smart_web 具有哪些功能
1. 进程守护功能  
smart_web 会自动托管 smart_rtmpd 流媒体服务器，即使出现问题，也能迅速拉起 smart_rtmpd 服务器，保证业务的继续进行

2. 远程管理  
有了 web 管理端可以不必每一次都远程登录到服务器上进行维护调整，同时针对 linux 一些非 UI 的系统，操作起来更加方便快捷，拜托了传统的命令行操作

3. 鉴权功能
目前 web 管理端自带鉴权功能，让服务器的安全和业务的编排更加安全和方便，让服务器的资源占用更合理

4. IP 黑名单
可以针对非法 IP 进行应用层的防护，防止一些不法分子攻击服务器，导致服务器资源的冗余占用，影响业务运行，增加运营成本

5. 配置修改
可以远程调整服务器配置

6. 系统日志
可以远程查看服务器运行日志，方便进行系统的维护和问题排除

7. GB28181
支持 GB28181 的多平台接入的配置和管理

8. 支持 Enhanced-rtmp 的 HEVC 推流和拉流

9. 配备更稳定更高效，架构更好的 smart_rtmpd 版本

10. 转发配置

11. 主动拉流（待实现）

12. IPTV (待实现)

13. 会话管理（待实现）


### 5. smart_web 怎么使用

1. 从官方获取到对应的 smart_web 软件包， windows 系统通常是 smart_web.win10.zip ， Linux 系统通常是 smart_web.linux.tar.gz  
2. 解压软件包  
    2.1 window 操作说明
    windows 解压 smart_web.win10.zip ，会解压出一个目录 smart_rtmpd

    2.2 linux 操作说明
    linux 解压 smart_web.linux.tar.gz 
    ~~~shell
    [root@localhost ~]# tar zxvf smart_web.linux.tar.gz
    ~~~
    会解压出一个目录 smart_rtmpd

3. 运行 smart_web  
    进入 smart_rtmpd 目录，下面包含两子目录 bin, web，bin 目录就是流媒体服务器 smart_rtmpd 所在目录，web 目录就是 web 管理后台目录，进入 web 目录
    3.1 window 操作说明
    web 目录下有两个 vbs 脚本，启动脚本 start_smart_web.vbs, 停止脚本 stop_smart_web.vbs。  
    启动 smart_web 用鼠标双击 start_smart_web.vbs ， 如果环境具备，基本上都会运行成功
    ~~~shell
    ######  ##     ##    ###    ########  ########    ##      ## ######## ########
    ##    ## ###   ###   ## ##   ##     ##    ##       ##  ##  ## ##       ##     ##
    ##       #### ####  ##   ##  ##     ##    ##       ##  ##  ## ##       ##     ##
    ######  ## ### ## ##     ## ########     ##       ##  ##  ## ######   ########
        ## ##     ## ######### ##   ##      ##       ##  ##  ## ##       ##     ##
    ##    ## ##     ## ##     ## ##    ##     ##       ##  ##  ## ##       ##     ##
    ######  ##     ## ##     ## ##     ##    ##        ###  ###  ######## ########



    /**************************************************************************************************
    *                                                                                                 *
    *  Copyright (C) 2024 www.qiyicc.com All rights reserved.                                         *
    *                                                                                                 *
    *  @file     deploy_smart_rtmpd                                                                   *
    *  @brief    一键部署 smart_rtmpd 流媒体服务器                                                    *
    *  Details.                                                                                       *
    *                                                                                                 *
    *  @author   FreeABC                                                                              *
    *  @email    cwf12345@sina.com                                                                    *
    *  @QQ       99766553                                                                             *
    *  @WebChat  99766553                                                                             *
    *  @github   https://github.com/superconvert/smart_rtmpd                                          *
    *  @gitee    https://gitee.com/superconvert/smart_rtmpd                                           *
    *  @website  http://qiyicc.com/download/rtmpd.zip                                                 *
    *  @version  0.1                                                                                  *
    *  @date     2024-07-08                                                                           *
    *                                                                                                 *
    *-------------------------------------------------------------------------------------------------*
    *  Remark         : Description                                                                   *
    *-------------------------------------------------------------------------------------------------*
    *  Change History :                                                                               *
    *  <Date>     | <Version> | <Author>       | <Description>                                        *
    *-------------------------------------------------------------------------------------------------*
    *  2024-07-08    | 0.1.0     | FreeABC         | 新建文件                                         *
    *-------------------------------------------------------------------------------------------------*
    *                                                                                                 *
    **************************************************************************************************/
    1. environment test
    rtmp port( 1935 ) has been tested
    http port( 8080 ) has been tested
    https port( 8181 ) has been tested
    rtsp port( 8554 ) has been tested
    srt port( 9000 ) has been tested
    sip port( 5060 ) has been tested
    ims port( 6666 ) has been tested
    web port( 5000 ) has been tested

    all port has been tested

    2. smart_rtmpd server

    2.1 start smart_rtmpd server
    please waiting ...
    please waiting ...
    the smart_rtmpd start success

    2.2 the play page url
    http://192.168.0.5:8080                                                  ---> 演示页面
    http://fe80::1573:63f0:fdec:74bd:8080
    http://192.168.187.1:8080
    http://fe80::b6e9:f9a4:f64e:5cf4:8080
    http://192.168.127.1:8080
    http://fe80::db17:da89:78b1:aedf:8080                                    ---> smart_rtmpd 启动成功

    3. smart_web server

    3.1 start smart_web server
    please waiting ...
    the smart_web start success

    3.2 the web manager page url
    http://192.168.0.5:5000                                                  ---> 管理端页面 ！！！
    http://fe80::1573:63f0:fdec:74bd:5000
    http://192.168.187.1:5000
    http://fe80::b6e9:f9a4:f64e:5cf4:5000
    http://192.168.127.1:5000
    http://fe80::db17:da89:78b1:aedf:5000                                    ---> smart_web 启动成功
    ~~~

    停止 smart_web 用鼠标双击 stop_smart_web.vbs 即可

    3.2 linux 操作说明
    web 目录下有两个 sh 脚本， 启动脚本 start_smart_web.sh ， 停止脚本 stop_smart_web.sh
    ~~~shell
    [root@localhost web]# ./start_smart_web.sh                               ---> ubuntu, debian 建议通过 bash 进行启动 
                                                                             ---> [root@localhost web]# bash ./start_smart_web.sh


    ######  ##     ##    ###    ########  ########    ##      ## ######## ########  
    ##    ## ###   ###   ## ##   ##     ##    ##       ##  ##  ## ##       ##     ## 
    ##       #### ####  ##   ##  ##     ##    ##       ##  ##  ## ##       ##     ## 
    ######  ## ### ## ##     ## ########     ##       ##  ##  ## ######   ########  
        ## ##     ## ######### ##   ##      ##       ##  ##  ## ##       ##     ## 
    ##    ## ##     ## ##     ## ##    ##     ##       ##  ##  ## ##       ##     ## 
    ######  ##     ## ##     ## ##     ##    ##        ###  ###  ######## ########  



    /**************************************************************************************************
    *                                                                                                 *
    *  Copyright (C) 2024 www.qiyicc.com All rights reserved.                                         *
    *                                                                                                 *
    *  @file     deploy_smart_rtmpd                                                                   *
    *  @brief    一键部署 smart_rtmpd 流媒体服务器                                                    *
    *  Details.                                                                                       *
    *                                                                                                 *
    *  @author   FreeABC                                                                              *
    *  @email    cwf12345@sina.com                                                                    *
    *  @QQ       99766553                                                                             *
    *  @WebChat  99766553                                                                             *
    *  @github   https://github.com/superconvert/smart_rtmpd                                          *
    *  @gitee    https://gitee.com/superconvert/smart_rtmpd                                           *
    *  @website  http://qiyicc.com/download/rtmpd.zip                                                 *
    *  @version  0.1                                                                                  *
    *  @date     2024-07-08                                                                           *
    *                                                                                                 *
    *-------------------------------------------------------------------------------------------------*
    *  Remark         : Description                                                                   *
    *-------------------------------------------------------------------------------------------------*
    *  Change History :                                                                               *
    *  <Date>     | <Version> | <Author>       | <Description>                                        *
    *-------------------------------------------------------------------------------------------------*
    *  2024-07-08    | 0.1.0     | FreeABC         | 新建文件                                         *
    *-------------------------------------------------------------------------------------------------*
    *                                                                                                 *
    **************************************************************************************************/


    端口检测
    rtmp  port 正常
    http  port 正常
    https port 正常
    rtsp  port 正常
    srt   port 正常
    sip   port 正常
    ims   port 正常
    web   port 正常

    启动流媒体服务器
    please waiting ...
    please waiting ...
    please waiting ...
    流媒体服务器启动成功

    您可以通过浏览器访问播放器页面
    http://192.168.127.133:8080                                                   ---> 播放演示页面
    http://192.168.127.132:8080                                                   ---> smart_rtmpd 启动成功

    启动 smart_web 服务
    please waiting ...
    please waiting ...
    please waiting ...
    please waiting ...
    please waiting ...
    please waiting ...
    please waiting ...
    WEB 服务器启动成功

    您可以通过浏览器访问管理页面
    http://192.168.127.133:5000                                                    ---> 管理端页面 !!!
    http://192.168.127.132:5000                                                    ---> smart_web 启动成功
    ~~~

4. 访问管理端页面  
打开浏览器输入 web 管理端页面 URL，此 URL 就是上一步 start_smart_web.vbs 或 start_smart_web.sh 启动成功中输出的 http://192.168.0.5:5000 或 http://192.168.127.133:5000
web 管理端页面输入用户名:密码，默认账号 admin:123456，进入管理端页面后，右上角 [admin] ---> [修改密码] 可以修改登录密码

5. 注册授权管理端  
登录 web 管理端系统后，左边任务栏 [系统信息] ---> [机器码] 复制，发送给官方获取注册码，填写注册码后，点注册授权，通常情况下，会显示 [已授权]，只有注册后的系统才能正常使用!!!

6. 推流鉴权  
登录 web 管理端系统后，左边任务栏 [鉴权管理] ---> [用户列表] 选第一个用户 用户ID：0, 用户昵称：admin ---> [授权] 添加对应的授权的 rtmp url 即可，此授权同时也生效于对应的 rtsp, srt 等推流
