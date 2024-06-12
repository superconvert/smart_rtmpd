# web 管理后台说明

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

# 编译运行

~~~shell
npm install
npm i request
npm run start 或 node run server.js
~~~

# 编译成 exe 文件

1. npm install -g pkg
2. pkg -t win server.js

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
  	      +-- cmd.bat
	      |
	      +-- config.json
	      |
	      +-- smart_web.db
	      |
	      +-- server.exe
	      |
	      +-- html
		  |    |
		  |    +-- config.js
		  |    |
		  |    +-- ... ...
	      |
	      +-- node_modules
~~~

# web 服务器配置文件
配置文件路径
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

# web 默认登陆账户
假设服务器地址为: 192.168.1.1，打开浏览器输入 http://192.168.1.1:5000，进入登陆页面
~~~shell
用户名：admin
密码：123456
~~~

