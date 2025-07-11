# smart rtmpd web 接口分为下面几类

|分类名称 | 功能描述|
|---|---|
|live|直播播放接口，对应服务器上的 live 目录|
|rec |录像回放接口，对于服务器上的 rec 目录|
|vod|点播接口，支持子目录，对应服务器上的 vod 目录|
|api|web 管理编程接口，当然前端页面可能也有可能用到|
|web|通用的 web 接口，对应服务器上的 html 目录|
|ws_im|IM 通讯接口，websocket 实现的 IM 会话接口|

# web live 接口说明
**功能：**

用于直播流播放

**格式：**

```bash
# 直播播放
# HTTP GET
http://<服务器地址或域名>:[服务器端口]/live/<流的名字>.<类型>
```

**例子：**
```bash
http://192.168.1.1:8080/live/stream.flv
```
|参数|说明|
|---|---|
|服务器地址|192.168.1.1 支持域名，支持 NAT 映射|
|服务器端口|8080|
|流的名字|stream|
|类型|flv 也支持 m3u8, mpd 等|

直播流推送成功后，WEB 服务端自动产生下面格式的流

|类型|说明|
|---|---|
|flv|这个支持 http://192.168.1.1:8080/live/stream.flv 的播放， 同时也支持 ws://192.168.1.1:8080/live/stream.flv 的播放|
|hls|这个支持 http://192.168.1.1:8080/live/stream.m3u8 的播放|
|dash|这个支持 http://192.168.1.1:8080/live/stream.mpd 的播放|

这些 URL 都是推流后，自动产生的，具体可以通过 http://192.168.1.1:8080/api/stream 进行查询所有的直播流

# web rec 接口说明

**功能：**

用于录像查询和回放

录像流程主要分为 4 步进行  
### 1.获取所有的录像列表，录像列表是流名称组成  
	~~~
	请求
	http://192.168.1.1:8080/api/rec  

	响应
	{
		"dirs" : 
		[
			"stream"                                     // 推流名称
		]
	}
	~~~
### 2.获取指定流录像天数列表  
	~~~
	请求
	http://192.168.1.1:8080/rec/stream  

	响应
	{
		"dirs" : 
		[
			"2025-06-28"								// 日期列表
		]
	}
	~~~
### 3.获取指定流某一天录像列表  
    ~~~
    请求
    http://192.168.1.1:8080/rec/stream/2025-06-28  

    响应
    {
        "files" : 
        [
            "12-44-11.m3u8",
            "12-45-20.m3u8",
            "12-46-27.m3u8",
            "12-47-33.m3u8"
        ]
    }
	~~~
### 4.播放具体的录像文件  
    用播放器播放  
    http://192.168.0.27:8080/rec/stream/2025-06-28/12-45-20.m3u8

smart rtmpd 的录像方式细节就是

```bash
# 推 rtmp 流进行直播并同时录像
rtmp://<服务器地址>:[服务器端口]/rec/<流的名字>
```
smart rtmpd 的录像都会自动存储到服务器的 rec 目录下，rec 目录下的一级子目录，就是上述 URL 中的服务器地址，比如：服务器有多个域名 www.qiyicc.com, www.smartrtmpd.com，那么 rec 目录下就会存在目录

|编号|一级子目录|
|---|---|
|1|www.qiyicc.com|
|2|www.smartrtmpd.com|

 下面我们就这个 URL 展开说明

```bash
# 比如：推送下述两路流
rtmp://www.qiyicc.com/rec/music
rtmp://www.qiyicc.com/rec/sport
```
那么上述两个录像 URL 会在服务器的目录 /rec/www.qiyicc.com/ 下产生二级子目录，一级子目录以服务器地址命名，二级字目录以流的名字命名

|编号|二级子目录|
|---|---|
|1|music|
|2|sport|

二级子目录下，会按日期精确到天命名产生三级子目录

|编号|三级子目录|
|---|---|
|1|2022-05-21|
|2|2022-05-22|

三级子目录下会记录具体的录像文件，文件名字以时分秒进行命名，类型见文件后缀，目前只支持 m3u8 或 mpd ，建议用 m3u8 进行存储，具体参见 config.xml 里的说明

|编号|录像文件|
|---|---|
|1|08-56-33.m3u8|
|2|09-12-35.m3u8|

**格式：**

```bash
# 获取录像信息或播放录像文件
# HTTP GET
http://<服务器地址或域名>:[服务器端口]/rec/<流的名称>/[day=年月日]/[time=时分秒].[ext=扩展名(m3u8或dash)]
example : http://192.168.1.2:8080/rec/stream/2023-10-18/13-17-49.m3u8
```

|参数|说明|
|---|---|
|无参 |查询录像日期列表 |
|day |查询指定日期录像文件列表表 |
|time |播放录像，此参数必须包含 day 参数，否则无效，直接播放此路录像 |
|ext |录像类型，一般为 m3u8 或 mpd |

- 无参例子如下
```bash
请求：
http://192.168.1.1:8080/rec/stream

响应：
{
    "dirs" : 
    [
        "2022-05-21"
    ]
}
```
这表明此路录像只有 2022-05-21 那天有录像存在

- 参数 day 例子如下
```bash
请求：
http://192.168.1.1:8080/rec/stream/2022-05-21

响应：
{
    "files" :
    [
        "18-22-11.m3u8",
        "18-24-33.m3u8",
        "18-34-02.m3u8"
    ]
}
```
这表明此路录像 2022-05-21 存在三个时间点的录像，分别是 18-22-11， 18-24-33，18-34-02 

- 参数 time 例子如下
```bash
请求：
http://192.168.1.1:8080/rec/stream/2022-05-21/18-22-11.m3u8

响应：
录像数据流，播放器拿到数据流就可以播放了
```
# web vod 接口说明
**功能：**

用于点播的功能，用户可以把自己的 mp4, mkv或其它类型的视频文件放到服务器上的 /vod 目录下或此目录的子目录下，子目录可以动态创建，支持多级，用户端只要访问对应的 URL 就能实现点播了，推荐用 fmp4 格式的文件

**格式：**
```bash
# 获取点播信息或播放点播文件
# HTTP GET
http://<服务器地址或域名>:[服务器端口]/vod/[一级字目录]/[二级子目录]/<文件名>
```

**例子：**
```bash
http://192.168.1.1:8080/vod/sport/football/worldcup.mp4
```
|参数|说明|
|---|---|
|sport|一级子目录|
|football|二级子目录|
|worldcup.mp4|视频文件|

VOD 文件列表查询，参见下面的 web api 接口有关 vod 的说明 

# web api 接口说明
**功能：**

为后台 WEB 管理或 WEB 前端业务的需求，提供的综合接口。

** 格式：**
```bash
# HTTP GET,PUT
http://<服务器地址>:[服务器端口]/api/<业务标识>
```

|业务标识|说明|
|---|---|
|live|直播信息查询接口|
|rec|录像信息查询接口|
|vod|点播信息查询接口|
|status|服务器状态查询接口|
|config|配置文件获取与设置接口|
|policy|服务器转发策略配置|
|statistics|服务器统计信息接口|

**业务标识 live**
```bash
# 获取直播流相关信息
# HTTP GET
http://<服务器地址>:[服务器端口]/api/live
```

|参数|说明|
|---|---|
|无参|返回当前所有在线流列表|
|vhost|直播流的 vhost 通常就是服务器地址，app	直播流的 app 标签，name 直播流的名字  vhost, app, name 必须同时附带，请求返回此路流的详细信息，参数信息以 rtmp url 为主，默认端口可以不带|
|cmd|目前只支持 cmd=count，查询此路视频当前播放端的个数，这个肯定不是精确的统计|

- 无参例子
```bash
例子如下

请求：

http://192.168.1.1:8080/api/live

响应：

{
    "stream" : 
    [
        "rtmp://192.168.1.1:1935/live/stream"
    ]
} 
每路直播流的 RTMP 的 URL 列表
```
- vhost 参数例子
```bash
请求：
http://192.168.1.1:8080/api/live?vhost=192.168.1.1:1935&app=live&name=stream
因为 rtmp 默认端口是 1935，也可以写成
http://192.168.1.1:8080/api/live?vhost=192.168.1.1&app=live&name=stream

响应：
{
	"app" : 
	{
		"duration" : "PT2S",
		"from" : "rtmp",
		"rate" : "91.81 b/s",
		"rec" : false
	},
	"media" : 
	{
		"audio" : 
		{
			"channel" : 2,
			"codec" : "aac",
			"samplebit" : 16,
			"samplerate" : 48000
		},
		"video" : 
		{
			"codec" : "h264",
			"fps" : 30,
			"gop" : 0,
			"height" : 720,
			"width" : 1280
		}
	},
	"urls" : 
	[
		{
			"type" : "rtmp",
			"url" : "rtmp://192.168.1.6/live/stream"
		},
		{
			"type" : "http-flv",
			"url" : "http://192.168.1.6:8080/live/stream.flv"
		},
		{
			"type" : "ws-flv",
			"url" : "ws://192.168.1.6:8080/live/stream.flv"
		},
		{
			"type" : "webrtc",
			"url" : "https://192.168.1.6:8181/live/stream.wms"
		},
		{
			"type" : "http-hls",
			"url" : "http://192.168.1.6:8080/live/stream.m3u8"
		},
		{
			"type" : "rtsp",
			"url" : "rtsp://118.145.6.103:554/live/stream"
		},
		{
			"type" : "srt",
			"url" : "srt://192.168.1.6:9000/live/stream"
		}
	]
}
```
- cmd 参数例子
```bash
请求：
http://192.168.1.1:8080/api/live?vhost=192.168.1.1:1935&app=live&name=stream&cmd=count

响应 ：
rtmp:0
flv:0
rtsp:0
后续可能修订为 json 格式
```
**业务标识 rec**
```bash
# 获取录像列表信息
# HTTP GET
http://<服务器地址>:[服务器端口]/api/rec
```

|参数|说明|
|---|---|
|无参|获取服务器上 /rec 目录下以服务器地址命名的目录下所有的录像名称列表|
|vhos|获取服务器上 /rec 目录下以 vhost 命名的目录下所有的录像名称列表|

- 无参例子
```bash
请求：
http://192.168.1.1:8080/api/rec

响应：
{
    "dirs" : 
    [
        "stream"
    ]
} 
```
查询到一路录像，名字为 stream，不带参数，默认参数 vhost 就为 192.168.1.1

- vhost 参数例子

```bash
请求：
http://192.168.1.1:8080/api/rec?vhost=www.qiyicc.com

响应：
{
    "dirs" : 
    [
        "music",
        "sport"
    ]
} 
```
查询到两路录像，名字为 music, sport

对于整个录像流程建议如下

1.  利用 http://192.168.1.1:8080/api/rec 查询录像列表，获取所有的录像名称         example : http://192.168.1.2:8080/api/rec
2.  利用 http://192.168.1.1:8080/rec/<流名称> 查询那天有录像产生                 example : http://192.168.1.2:8080/rec/stream
3.  利用 http://192.168.1.1:8080/rec/<流名称>/day 查询录像文件列表               example : http://192.168.1.2:8080/rec/stream/2023-10-18
4.  利用 http://192.168.1.1:8080/rec/<流名称>/day/time 播放录像                 example : http://192.168.1.2:8080/rec/stream/2023-10-18/13-17-49.m3u8

具体使用方法，参见上述的 rec 章节说明

**业务标识 vod**
```bash
# HTTP GET
http://192.168.1.1:8080/api/vod
```
- 查询 vod 根目录
```bash
请求：
http://192.168.1.1:8080/api/vod
 
响应：
 
{
    "dirs" : 
    [
        "discovery"
    ],
    "files" : 
    [
        "video.mp4"
    ]
}
```
我们看到查询到一个子目录和一个文件
- 查询子目录
```bash
请求：
http://192.168.1.1:8080/api/vod/discovery

响应：
{ 
    "dirs" :
    [ 
        "" 
    ], 
    "files" : 
    [ 
        "river.mkv"
    ] 
}
```
- 播放点播文件
```bash
http://192.168.1.1:8080/api/vod/discovery/river.mkv
```
- 上传点播视频到服务器
```bash
# HTTP POST
http://192.168.1.1:8080/vod/stream
```
支持多文件上传，可以利用 postman 进行实验

**业务标识 status**

获取服务器状态
```bash
# HTTP GET
http://192.168.1.1:8080/api/status
 
请求：
http://192.168.1.1:8080/api/status
 
响应：
{
	"http" : 
	{
		"port" : 8080,
		"run" : true
	},
	"https" : 
	{
		"port" : 8181,
		"run" : false
	},
	"rtmp" : 
	{
		"port" : 1935,
		"run" : true,
		"ssl" : false
	},
	"rtsp" : 
	{
		"port" : 8554,
		"run" : true,
		"ssl" : false
	},
	"srt" : 
	{
		"port" : 9000,
		"run" : true
	},
	"start_time" : "2023-02-18 06:30:33"
}
```
**业务标识 config**

获取配置信息和设置配置信息，需要一个复杂的逻辑，需要重启服务器，况且只能 127.0.0.1 地址访问，这里不多说了，大家可以参考我们 github 上的 WEB 管理后台的接口部分调用

```bash
# 获取配置信息
# HTTP GET
http://127.0.0.1:8080/api/config
 
# 更新配置信息
# HTTP POST
http://127.0.0.1:8080/api/config
```

**集群/流转发标识 policy**

这块同上，相对复杂，这里不做详细解释

**业务标识 statistics**

这个是获取的统计信息，目前意义不大
```bash
# 获取服务器统计信息
# HTTP GET
http://192.168.1.1:8080/api/statistics
```
# WEB ( web ) 通用接口说明

这个接口对应的服务器上的 /html 目录，这个是个简单的 http 服务器，可以把播放器页面与脚本，聊天室页面与脚本到此目录，目录与文件名字禁止与上述 URL 中的重复，那样会导致优先访问上述 URL，把 index.html 放到 /html 目录下，直接输入 http://192.168.1.1:8080 就能直接显示了，这里不做过多介绍

例子，访问播放器 ：
```bash
http://192.168.1.1:8080/webrtc.html
```
效果如下
![](https://oscimg.oschina.net/oscnet/up-d891fbe73eecdb3926c7fa0f155027ad5ad.png)

# WEB IM 接口说明
这个对应服务器下 /html 目录下的 webrtc.html 以及脚本文件，有兴趣的朋友可以自行研究一下代码。

这个里面实现点对点聊天，群组聊天，利用浏览器自带的 webrtc 进行音视频聊天。这里就不做过多说明，具体实现就是上图 webrtc.html 

# WEB 接口认证
参见服务器的配置文件 config.xml
```xml
<config>
    <authurl timeout="3000">http://www.qiyicc.com:80/api/auth<authurl/>
</config>
```
为了防止非法操作上述 web 接口，需要对每个 web 请求进行鉴权验证。就需要在服务器上配置类似的验证信息。服务器作为 web client，鉴权服务器作为 web server ，访问方式就是一个 HTTP GET 请求
必须配置为一个标准的 http url , 例如：http://www.qiyicc.com/api/auth 或 https://qiyicc.com/api/auth，否则就是无效配置，鉴权功能就失效。

|参数|说明|
|---|---|
|timeout|连接鉴权服务器超时时间，毫秒|

```bash
GET /api/auth?type=http&role=api HTTP/1.1
User-Agent: smart_rtmpd
Host: www.qiyicc.com:80
Connection: close

``` 
/api/auth?type=http&role=api

/api/auth 就是 config.xml 里面配置的 url 的 path 部分，参数为 smart_rtmpd 自动加上的 ?type=http&role=api  
上述参数 type 为 http 请求，role 表示是有 api 接口的调用过来

|名称|说明|
|---|---|
|http| 来自  http 请求的鉴权 |
|rtmp| 来自 rtmp 请求的鉴权 |
|rtsp| 来自 rtsp 请求的鉴权 |
|srt| 来自 srt 请求的鉴权|

参数 role 表示这个鉴权请求是来自 api 这个业务标识

|名称|说明|
|---|---|
|api|这是 http api 接口|
|upload|这是 http 上传 |
|download|这是 http vod 下载|
|publisher| 这是推流角色 rtmp, rtsp, srt |
|player|这是拉流角色 rtmp, rtsp, srt, http rec, http flv, hls, dash, webrtc|

如果 router 配置为空那么请求就变成
```bash
GET /api/auth?type=http&role=api HTTP/1.1
User-Agent: smart_rtmpd
Host: www.qiyicc.com:80
Connection: close

```

