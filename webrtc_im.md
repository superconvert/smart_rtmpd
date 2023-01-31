# webrtc im description

1. Why is it called im webrtc?
We know that the extended version of smart_rtmpd is called smart_webrtc, which already supports the webrtc function; however, the function of webrtc here only refers to push streaming through rtmp, rtsp, srt protocols, and smart_webrtc transcodes the video through the media layer video (h264 ---> vp8 ) And audio (aac ---> opus) to achieve this function, currently only supports H5 streaming in webrtc mode.

The webrtc im function here is the webrtc im function, which is parallel to the existing smart_rtmpd function. There is no interaction between them, there is no intercommunication and transcoding. That is to say, rtmp, rtsp, srt are mutually converted, and there is no connection between webrtc im and them, including signaling and media data.

2. What are the advantages of webrtc im?
webrtc im functions are all realized through web pages. As long as the browser version supports webrtc functions, it can meet your requirements and further realize your requirements on this basis. This greatly adapts to almost all devices, compatibility issues, and environmental problems are almost no longer obstacles! ! !

webrtc im deployment is more convenient, as long as you configure smart_rtmpd and click Run, you only need to open the browser and enter the URL on the front end, and all your needs can be met. This greatly simplifies your various configuration troubles, compatibility issues, and environmental settings, all of which are thrown aside.

3. What functions does webrtc im have?
Account login, online list/user search, message chat, peer audio and video (webrtc p2p)

Chat room list, chat room search, chat room entry, chat room user list, chat room user online notification, user show list, user show notification, chat room group chat, chat room audio and video (webrtc sfu)

4. How to use the webrtc im function of smart_rtmpd
4.1 Making a certificate

Why do I need to make a certificate? Generally, the browser opens the audio and video equipment, and the https link is required to have the authority to execute it. Therefore, we need to make a certificate to access the internal http server of smart_rtmpd via https. In this way, there will be no problem when you open the audio and video equipment through the web page.

If you have a formal certificate, you can ignore section 4.1. You know that a certificate requires money, and most of the testing and verification process is without a certificate. Now I will teach you how to generate a certificate.

Here, mkcert is used to generate the certificate, which needs to be downloaded from github,

https://github.com/FiloSottile/mkcert/releases

We generally choose mkcert-xxx-windows-amd64.exe to download to the local and rename it to mkcert.exe.

4.1.1

In the command line (win + r hotkey pops up the run dialog box, enter cmd to enter), switch to the directory where mkcert.exe is located

4.1.2

Assuming that the operating address of your smart_rtmpd server is 192.168.1.1, here we have a virtual URL of www.smartrtmpd.com, then we enter

mkcert.exe www.smartrtmpd.com 192.168.1.1
Then the corresponding private key and certificate will be generated in the corresponding directory, which is basically similar to www.smartrtmpd.com+1-key.pem, www.smartrtmpd.com+1.pem format, we renamed server respectively. Key and server.crt, be careful not to make a mistake, the one with the key is the private key, the one without the key is the certificate.

4.1.3

Install the certificate to the local, don’t ask me why, just follow the execution below

mkcert.exe -install
4.1.4

Modify the local dns (c:\windows\system32\drivers\etc\hosts) file and add the following statement to this file.

192.168.1.1 www.smartrtmpd.com
Note that you need to add this configuration to verify the function of smart_rtmpd on that machine. The purpose of this sentence is to tell the machine that the address of the domain name www.smartrtmpd.com is 192.168.1.1, which is the address where the smart_rtmpd server runs.

4.2 Configure smart_rtmpd server
Copy the certificate and private key generated above to the directory of smart_rtmpd (server 192.168.1.1). The following operation is on 192.168.1.1 where smart_rtmpd is running, not the machine where you generated the certificate. Open the configuration file config.xml

-<ssl>
  <serverca />
  <serverkey>server.key</serverkey>
  <servercert>server.crt</servercert>
  <clientca />
  <clientkey />
  <clientcert />
  </ssl>

-<http>
  <ip />
  <port>8080</port>
  <sport>8181</sport>
  <ssl>true</ssl>

Configure the certification path, open the ssl of the http server and configure the port, if there is no other requirement, just start the smart_rtmpd server

4.3 Run webrtc im
Enter on the machine where you just configured the hosts file

https://www.smartrtmpd.com:8181/webrtc.html
Be sure to see clearly that it is https, so that you can see the corresponding webrtc operation interface, of course enter

http://www.smartrtmpd.com:8080/player.html
You will experience another powerful function of smart_rtmpd, which is h5, live broadcast, video and VOD functions!