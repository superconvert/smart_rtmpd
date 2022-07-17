# smart rtmpd web �ӿڷ�Ϊ���漸��

|�������� | ��������|
|---|---|
|live|�������ƽ�����ǵ�ֱ�����Žӿ�|
|rec |�������ƽ�����ǵ�¼��طŽӿ�|
|vod|����������ǵ㲥�ӿڣ�֧����Ŀ¼����Ӧ�������ϵ� vod Ŀ¼|
|api|��Ҫ��Ϊ�� web ����Ԥ���Ľӿڣ���Ȼǰ��ҳ�����Ҳ�п����õ�|
|web|����ͨ�õ� web �ӿڣ����磺������ҳ��ͽű�ͨ����Щ�ӿ����غͷ���|
|ws_im|ͨ�� websocket ʵ�ֵ� IM �Ự�ӿ�|

# web live �ӿ�˵��
**���ܣ�**

����ֱ��������

**��ʽ��**

```bash
# ֱ������
# HTTP GET
http://<��������ַ������>:[�������˿�]/live/<��������>.<����>
```

**���ӣ�**
```bash
http://192.168.1.1:8080/live/stream.flv
```
|����|˵��|
|---|---|
|��������ַ|192.168.1.1 ֧��������֧�� NAT ӳ��|
|�������˿�|8080|
|��������|stream|
|����|flv Ҳ֧�� m3u8, mpd ��|

ֱ�������ͳɹ���WEB ������Զ����������ʽ����

|����|˵��|
|---|---|
|flv|���֧�� http://192.168.1.1:8080/live/stream.flv �Ĳ��ţ� ͬʱҲ֧�� ws://192.168.1.1:8080/live/stream.flv �Ĳ���|
|hls|���֧�� http://192.168.1.1:8080/live/stream.m3u8 �Ĳ���|
|dash|���֧�� http://192.168.1.1:8080/live/stream.mpd �Ĳ���|

��Щ URL �����������Զ������ģ��������ͨ�� http://192.168.1.1:8080/api/stream ���в�ѯ���е�ֱ����

# web rec �ӿ�˵��

**���ܣ�**

����¼���ѯ�ͻط�

smart rtmpd ��¼��ʽ����

```bash
# �� rtmp ������ֱ����ͬʱ¼��
rtmp://<��������ַ>:[�������˿�]/rec/<��������>
```
smart rtmpd ��¼�񶼻��Զ��洢���������� rec Ŀ¼�£�rec Ŀ¼�µ�һ����Ŀ¼���������� URL �еķ�������ַ�����磺�������ж������ www.qiyicc.com, www.smartrtmpd.com����ô rec Ŀ¼�¾ͻ����Ŀ¼

|���|һ����Ŀ¼|
|---|---|
|1|www.qiyicc.com|
|2|www.smartrtmpd.com|

 �������Ǿ���� URL չ��˵��

```bash
# ���磺����������·��
rtmp://www.qiyicc.com/rec/music
rtmp://www.qiyicc.com/rec/sport
```
��ô��������¼�� URL ���ڷ�������Ŀ¼ /rec/www.qiyicc.com/ �²���������Ŀ¼��һ����Ŀ¼�Է�������ַ������������Ŀ¼��������������

|���|������Ŀ¼|
|---|---|
|1|music|
|2|sport|

������Ŀ¼�£��ᰴ���ھ�ȷ������������������Ŀ¼

|���|������Ŀ¼|
|---|---|
|1|2022-05-21|
|2|2022-05-22|

������Ŀ¼�»��¼�����¼���ļ����ļ�������ʱ����������������ͼ��ļ���׺��Ŀǰֻ֧�� m3u8 �� mpd �������� m3u8 ���д洢������μ� config.xml ���˵��

|���|¼���ļ�|
|---|---|
|1|08-56-33.m3u8|
|2|09-12-35.m3u8|

**��ʽ��**

```bash
# ��ȡ¼����Ϣ�򲥷�¼���ļ�
# HTTP GET
http://<��������ַ������>:[�������˿�]/rec/<��������>?[day=������]&[time=ʱ����]
```

|����|˵��|
|---|---|
|�޲�|��ѯ¼�������б�|
|day|��ѯָ������¼���ļ��б���
| time | ����¼�񣬴˲���������� day ������������Ч��ֱ�Ӳ��Ŵ�·¼��|

- �޲���������
```bash
����
http://192.168.1.1:8080/rec/stream

��Ӧ��
{
    "dirs" : 
    [
        "2022-05-21"
    ]
}
```
�������·¼��ֻ�� 2022-05-21 ������¼�����

- ���� day ��������
```bash
����
http://192.168.1.1:8080/rec/stream?day=2022-05-21

��Ӧ��
{
    "files" :
    [
        "18-22-11.m3u8",
        "18-24-33.m3u8",
        "18-34-02.m3u8"
    ]
}
```
�������·¼�� 2022-05-21 ��������ʱ����¼�񣬷ֱ��� 18-22-11�� 18-24-33��18-34-02 

- ���� time ��������
```bash
����
http://192.168.1.1:8080/rec/stream?day=2022-05-21&time=18-22-11.m3u8

��Ӧ��
¼�����������������õ��������Ϳ��Բ�����
```
# web vod �ӿ�˵��
**���ܣ�**

���ڵ㲥�Ĺ��ܣ��û����԰��Լ��� mp4, mkv���������͵���Ƶ�ļ��ŵ��������ϵ� /vod Ŀ¼�»��Ŀ¼����Ŀ¼�£���Ŀ¼���Զ�̬������֧�ֶ༶���û���ֻҪ���ʶ�Ӧ�� URL ����ʵ�ֵ㲥�ˣ��Ƽ��� fmp4 ��ʽ���ļ�

**��ʽ��**
```bash
# ��ȡ�㲥��Ϣ�򲥷ŵ㲥�ļ�
# HTTP GET
http://<��������ַ������>:[�������˿�]/vod/[һ����Ŀ¼]/[������Ŀ¼]/<�ļ���>
```

**���ӣ�**
```bash
http://192.168.1.1:8080/vod/sport/football/worldcup.mp4
```
|����|˵��|
|---|---|
|sport|һ����Ŀ¼|
|football|������Ŀ¼|
|worldcup.mp4|��Ƶ�ļ�|

VOD �ļ��б���ѯ���μ������ web api �ӿ��й� vod ��˵�� 

# web api �ӿ�˵��
**���ܣ�**

Ϊ��̨ WEB ������ WEB ǰ��ҵ��������ṩ���ۺϽӿڡ�

** ��ʽ��**
```bash
# HTTP GET,PUT
http://<��������ַ>:[�������˿�]/api/<ҵ���ʶ>
```

|ҵ���ʶ|˵��|
|---|---|
|live|ֱ����Ϣ��ѯ�ӿ�|
|rec|¼����Ϣ��ѯ�ӿ�|
|vod|�㲥��Ϣ��ѯ�ӿ�|
|status|������״̬��ѯ�ӿ�|
|config|�����ļ���ȡ�����ýӿ�|
|policy|������ת����������|
|statistics|������ͳ����Ϣ�ӿ�|

**ҵ���ʶ live**
```bash
# ��ȡֱ���������Ϣ
# HTTP GET
http://<��������ַ>:[�������˿�]/api/live
```

|����|˵��|
|---|---|
|�޲�|���ص�ǰ�����������б�|
|vhost|ֱ������ vhost ͨ�����Ƿ�������ַ��app	ֱ������ app ��ǩ��name ֱ����������  vhost, app, name ����ͬʱ���������󷵻ش�·������ϸ��Ϣ��������Ϣ�� rtmp url Ϊ����Ĭ�϶˿ڿ��Բ���|
|cmd|Ŀǰֻ֧�� cmd=count����ѯ��·��Ƶ��ǰ���Ŷ˵ĸ���������϶����Ǿ�ȷ��ͳ��|

- �޲�����
```bash
��������

����

http://192.168.1.1:8080/api/live

��Ӧ��

{
    "stream" : 
    [
        "rtmp://192.168.1.1:1935/live/stream"
    ]
} 
ÿ·ֱ������ RTMP �� URL �б�
```
- vhost ��������
```bash
����
http://192.168.1.1:8080/api/live?vhost=192.168.1.1:1935&app=live&name=stream
��Ϊ rtmp Ĭ�϶˿��� 1935��Ҳ����д��
http://192.168.1.1:8080/api/live?vhost=192.168.1.1&app=live&name=stream

��Ӧ��
{
    "audio" : 
    {
        "channel" : "2",
        "codec" : "aac",
        "samplebit" : "16",
        "samplerate" : "44100"
    },
    "duration" : "PT7M50S",
    "from" : "rtmp",
    "rate" : "4.05 kb/s",
    "rec" : "none",
    "urls" : 
    [
        {
            "type" : "rtmp",
            "url" : "rtmp://192.168.1.1:1935/live/stream"
        },
        {
            "type" : "http-flv",
            "url" : "http://192.168.1.1:8080/live/stream.flv"
        },
        {
             "type" : "ws-flv",
             "url" : "ws://192.168.1.1:8080/live/stream.flv"
         },
         {
              "type" : "http-hls",
              "url" : "http://192.168.1.1:8080/live/stream.m3u8"
          },
          {
               "type" : "http-dash",
               "url" : "http://192.168.1.1:8080/live/stream.mpd"
            },
            {
                "type" : "rtsp",
                "url" : "rtsp://192.168.1.1:8554/live/stream"
            },
            {
                 "type" : "srt",
                 "url" : "srt://192.168.1.1:9000/live/stream"
             }
        ],
        "video" : 
       {
              "codec" : "h264",
              "fps" : "24",
              "gop" : "88",
              "height" : "562",
              "width" : "1000"
        }
}
```
- cmd ��������
```bash
����
http://192.168.1.1:8080/api/live?vhost=192.168.1.1:1935&app=live&name=stream&cmd=count

��Ӧ ��
rtmp:0
flv:0
rtsp:0
���������޶�Ϊ json ��ʽ
```
**ҵ���ʶ rec**
```bash
# ��ȡ¼���б���Ϣ
# HTTP GET
http://<��������ַ>:[�������˿�]/api/rec
```

|����|˵��|
|---|---|
|�޲�|��ȡ�������� /rec Ŀ¼���Է�������ַ������Ŀ¼�����е�¼�������б�|
|vhos|��ȡ�������� /rec Ŀ¼���� vhost ������Ŀ¼�����е�¼�������б�|

- �޲�����
```bash
����
http://192.168.1.1:8080/api/rec

��Ӧ��
{
    "dirs" : 
    [
        "stream"
    ]
} 
```
��ѯ��һ·¼������Ϊ stream������������Ĭ�ϲ��� vhost ��Ϊ 192.168.1.1

- vhost ��������

```bash
����
http://192.168.1.1:8080/api/rec?vhost=www.qiyicc.com

��Ӧ��
{
    "dirs" : 
    [
        "music",
        "sport"
    ]
} 
```
��ѯ����·¼������Ϊ music, sport

��������¼�����̽�������

1.  ���� http://192.168.1.1:8080/api/rec ��ѯ¼���б�����ȡ���е�¼������
2.  ���� http://192.168.1.1:8080/rec/<������> ��ѯ������¼�����
3.  ���� http://192.168.1.1:8080/rec/<������>?day=xxxx-yy-zz ��ѯ¼���ļ��б�
4.  ���� http://192.168.1.1:8080/rec/<������>?day=xxxx-yy-zz&time=iiiii.m3u8 ����¼��

����ʹ�÷������μ������� rec �½�˵��

**ҵ���ʶ vod**
```bash
# HTTP GET
http://192.168.1.1:8080/api/vod
```
- ��ѯ vod ��Ŀ¼
```bash
����
http://192.168.1.1:8080/api/vod
 
��Ӧ��
 
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
���ǿ�����ѯ��һ����Ŀ¼��һ���ļ�
- ��ѯ��Ŀ¼
```bash
����
http://192.168.1.1:8080/api/vod/discovery

��Ӧ��
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
- ���ŵ㲥�ļ�
```bash
http://192.168.1.1:8080/api/vod/discovery/river.mkv
```
- �ϴ��㲥��Ƶ��������
```bash
# HTTP POST
http://192.168.1.1:8080/vod/stream
```
֧�ֶ��ļ��ϴ����������� postman ����ʵ��

**ҵ���ʶ status**

��ȡ������״̬
```bash
# HTTP GET
http://192.168.1.1:8080/api/status
 
����
http://192.168.1.1:8080/api/status
 
��Ӧ��
{
    "http" : 
    {
        "port" : 8080,
        "run" : true,
        "sport" : 8181,
        "ssl" : false
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
    "start_time" : "2022-05-21 22:18:31"
}
```
**ҵ���ʶ config**

��ȡ������Ϣ������������Ϣ����Ҫһ�����ӵ��߼�����Ҫ����������������ֻ�� 127.0.0.1 ��ַ���ʣ����ﲻ��˵�ˣ���ҿ��Բο����� github �ϵ� WEB ������̨�Ľӿڲ��ֵ���

```bash
# ��ȡ������Ϣ
# HTTP GET
http://127.0.0.1:8080/api/config
 
# ����������Ϣ
# HTTP POST
http://127.0.0.1:8080/api/config
```

**ҵ���ʶ policy**

���ͬ�ϣ���Ը��ӣ����ﲻ����ϸ����

**ҵ���ʶ statistics**

����ǻ�ȡ��ͳ����Ϣ��Ŀǰ���岻��
```bash
# ��ȡ������ͳ����Ϣ
# HTTP GET
http://192.168.1.1:8080/api/statistics
```
# WEB ( web ) ͨ�ýӿ�˵��

����ӿڶ�Ӧ�ķ������ϵ� /html Ŀ¼������Ǹ��򵥵� http �����������԰Ѳ�����ҳ����ű���������ҳ����ű�����Ŀ¼��Ŀ¼���ļ����ֽ�ֹ������ URL �е��ظ��������ᵼ�����ȷ������� URL���� index.html �ŵ� /html Ŀ¼�£�ֱ������ http://192.168.1.1:8080 ����ֱ����ʾ�ˣ����ﲻ���������

���ӣ����ʲ����� ��
```bash
http://192.168.1.1:8080/webrtc.html
```
Ч������
![](https://oscimg.oschina.net/oscnet/up-d891fbe73eecdb3926c7fa0f155027ad5ad.png)

# WEB IM �ӿ�˵��
�����Ӧ�������� /html Ŀ¼�µ� webrtc.html �Լ��ű��ļ�������Ȥ�����ѿ��������о�һ�´��롣

�������ʵ�ֵ�Ե����죬Ⱥ�����죬����������Դ��� webrtc ��������Ƶ���졣����Ͳ�������˵��������ʵ�־�����ͼ webrtc.html 

# WEB �ӿ���֤
�μ��������������ļ� config.xml
```xml
<config>
    <authurl timeout="3000" router="/api">www.qiyicc.com<authurl/>
</config>
```
Ϊ�˷�ֹ�Ƿ��������� web �ӿڣ���Ҫ��ÿ�� web ������м�Ȩ��֤������Ҫ�ڷ��������������Ƶ���֤��Ϣ����������Ϊ web client����Ȩ��������Ϊ web server �����ʷ�ʽ����һ�� HTTP GET ����

|����|˵��|
|---|---|
|timeout|���Ӽ�Ȩ��������ʱʱ�䣬����|
|router|���� HTTP GET ���� URL ǰ��ӵ�ǰ׺�������Ȩ��������̷���|

- router ����˵��
�������������router="/api"��������Ҫ�Ի�ȡ������������Ȩ��web client ������Ȩ�������� HTTP �������£�

```bash
GET /api/api/config?type=http&role=api HTTP/1.1
User-Agent: smart_rtmpd
Host: www.qiyicc.com:80
Connection: close

``` 
/api/api/config?type=http&role=api

��һ�� api �����������õ� router="/api"
�ڶ��� api ���������� web api �ӿڲ��ֵ� api/config
���� type ��ʾ�����Ȩ���������� http ҵ��

|����|˵��|
|---|---|
|http| ����  http ����ļ�Ȩ |
|rtmp| ���� rtmp ����ļ�Ȩ |
|rtsp| ���� rtsp ����ļ�Ȩ |
|srt| ���� srt ����ļ�Ȩ|

���� role ��ʾ�����Ȩ���������� api ���ҵ���ʶ

|����|˵��|
|---|---|
|api|���� http api �ӿ�|
|upload|���� http �ϴ� |
|download|���� http vod ����|
|publisher| ����������ɫ rtmp, rtsp, srt |
|player|����������ɫ rtmp, rtsp, srt, http rec, http flv, hls, dash, webrtc|

��� router ����Ϊ����ô����ͱ��
```bash
GET /api/config?type=http&role=api HTTP/1.1
User-Agent: smart_rtmpd
Host: www.qiyicc.com:80
Connection: close

```
