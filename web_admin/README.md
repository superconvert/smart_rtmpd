﻿# web 管理后台说明

web 管理后台的整体说明，主要是 web 的一些使用方法，方便后续布署，主要是以 windows 系统为例，Linux 系统大部分都是雷同的，自行编译

# web 管理网络拓扑

~~~shell
  +----------+                      +-------------+               +-------------+
  |  client  | <--- http/https ---> | web manager | <--- rpc ---> | smart_rtmpd |
  +----------+                      +-------------+               +-------------+
~~~

# 注意事项

web 里面的文件引用路径都需要改成 path 的 join 的形式，比如文件 config.json 的路径就是

~~~shell
var path = require('path');
path.join(process.cwd(), 'config.json');
~~~

# nodejs 环境安装
Ubuntu 16.04 版本：
~~~shell
 # 下载 nodejs 源脚本
 curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
 # 初始化 nodejs 安装环境
 bash nodesource_setup.sh
 # 安装 nodejs 
 apt install nodejs -y
 # 查看 node 版本
 node -v 
 cd web/
 rm node_modules/ package.json package-lock.json -rf
 chmod +x *.sh
 # 设置 npm 加速源
 npm config set registry https://registry.npmmirror.com
 # 初始化项目
 npm init
 npm install
 npm i cors
 npm i express
 npm i log4js 
 npm i co 
 npm i jsonwebtoken 
 npm i silly-datetime
 npm i request
 npm i xmldoc
 npm i thunkify
 npm i diskinfo 
 npm i sqlite3
 npm i formidable
 npm run start
~~~
ARM64 的环境和 Ubuntu 16.04 流程差不多， node 版本选择 v14.6.0 或合适的版本即可

Windows 版本:  
~~~shell
  nodejs 版本 https://cdn.npmmirror.com/binaries/node/latest-v18.x/node-v18.20.1-x64.msi  
  同样也需要 npm 的 Ubuntu 下那些 npm 的初始化和安装步骤
~~~

# 编译运行

~~~shell
npm run start 或 node run server.js
~~~

# 编译成可执行文件

Windows 环境：
~~~shell
# 安装 pkg
1. npm install -g pkg
# 编译 server.exe
2. pkg -t win server.js -o smart_web
# 修改配置文件
3. 核对配置文件 config.json
media 项下的 port: 8080 必须和 smart_rtmpd 的 http 端口一致
# 打包制作发布文件 smart_web.zip
4. 用 winrar 打包 cmd.bat config.json html/ node_sqlite3.node smart_web
~~~

Ubuntu 16.04 需要在 Linux 的环境下制作
~~~shell
# 安装 pkg
1. npm install -g pkg
# 需要拷贝 sqlite3 插件
2. cp node_modules/sqlite3/build/Release/node_sqlite3.node ./
# 因为 node 的版本是 16，所以写成 node16，编译 server
3. pkg -t node16-linux server.js -o smart_web
# 修改配置文件
4. 核对配置文件 config.json
media 项下的 port: 8080 必须和 smart_rtmpd 的 http 端口一致
# 打包制作发布文件 smart_web.tar.gz
5. tar zcvf smart_web.tar.gz cmd.sh config.json exec.sh html/ node_sqlite3.node smart_web
~~~

ARM64 需要在 ARM64 环境下制作
~~~shell
# 检验 node 版本
1. node -v
v14.6.0
# 安装 pkg
2. npm install -g pkg
# 需要拷贝 sqlite3 插件
3. cp node_modules/sqlite3/build/Release/node_sqlite3.node ./
# 因为 node 的版本是 14，所以写成 node14，编译 server
4. pkg -t node14-linux-arm64 server.js -o smart_web
# 修改配置文件
5. 核对配置文件 config.json
media 项下的 port: 8080 必须和 smart_rtmpd 的 http 端口一致
# 打包制作发布文件 smart_web.tar.gz
6. tar zcvf smart_web.tar.gz cmd.sh config.json exec.sh html/ node_sqlite3.node smart_web
~~~

linux 下自行编译对应的版本

# 目录布局

创建根目录 smart_rtmpd， 里面包含两个目录 bin, web. bin 就是 smart_rtmpd 服务器程序目录，web 就是 web 管理后台的目录.
bin : Windows 下解压 smart_rtmpd_win.zip 文件内容到 bin 目录下； Linux 下解压 smart_rtmpd.coroutines.ubuntu16.04LTS.x64.tar.gz 文件内容到 bin 目录下
web : 就是 web 网页编译后的运行文件所在的目录

~~~shell
smart_rtmpd 
     |
     +-- bin
     |    |
     |    +-- vod
     |    |
     |    +-- log
     |    |
     |    +-- ims
     |    |
     |    +-- html
     |    |
     |    +-- live
     |    |
     |    +-- config.xml
     |    |
     |    +-- policy.xml
     |    |
     |    +-- ice_server.json
     |    |
     |    +-- smart_rtmpd.exe
     |    |
     |    +-- ... ...
     |
     +-- web
          |
          +-- cmd.sh(bat)                 // windows 用 cmd.bat， linux 和 arm64 用 cmd.sh
          |
          +-- exec.sh                     // windows 可以不带此文件，linux 和 arm64 必须带有此文件
          |
          +-- config.json                 // 根据需要修改里面的内容
          |
          +-- passwd                      // 默认的密码文件，默认密码: 123456
          |
          +-- server.exe
          |
          +-- html
          |    |
          |    +-- config.js              // 修改里面的 ip:port 为您的服务器地址和端口
          |    |
          |    +-- ... ...
          |
          +-- node_sqlite3.node           // windows 下用 windows 版本的，linux 用 linux 版本的，arm64 用 arm64 版本的
~~~

# web 服务器配置文件
后台配置文件 config.json
smart_rtmpd --> web --> config.json
~~~shell
{
   # web 服务器运行端口
   "port":5000,
   "restart":3000,
   "binpath":"../bin/",
   "jwt":{
     "secret":"20120507",
     "algorithm":"HS256",
     "expires":"5m"
   },
   # 媒体服务器 smart_rtmpd 配置信息
   "media":{
      "host":"127.0.0.1",
      "port":8080,
      "timeout":1000,
      "config":"/api/config",
      "stream":"/api/live",
      "status":"/api/status",
      "policy":"/api/policy",
      "license":"/api/license"
   }
}
~~~

前端配置文件 html/config.js
~~~shell
# 这个地址必须改成您的服务器地址和端口!!!
var baseUrl = 'http://127.0.0.1:5000/api';   
sessionStorage.setItem('baseUrl', baseUrl);
~~~

# web 默认登陆账户
假设服务器地址为: 192.168.1.1，打开浏览器输入 http://192.168.1.1:5000，进入登陆页面
~~~shell
用户名：admin
密码：123456
~~~

