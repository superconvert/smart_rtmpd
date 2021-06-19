'use strict';

const co = require('co');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const date = require('silly-datetime');
const iconv = require('iconv-lite');
const request = require('request');
const thunkify = require('thunkify');
const readline = require('readline');
const child_process = require('child_process');
const config = require('./config');
const os_utils = require('./os_utils');

var pwdfile = 'passwd';
var readdir=thunkify(fs.readdir);

// ---------------------------------------------
// 延迟
// ---------------------------------------------
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ----------------------------------------------------------
// 加密密码
// ----------------------------------------------------------
function crypt_passwd (password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

// --------------------------------------------
// 响应正确值到前端
// --------------------------------------------
function succ_response(res, val) {
    var data = {
        "code": 0,
        "msg": "ok",
        "data": val
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
}

// --------------------------------------------
// 响应错误的值到前端
// --------------------------------------------
function fail_response(res, msg, val) {
    var data = {
        "code": 1,
        "msg": msg,
        "data": val
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
}

// --------------------------------------------
// 获取与 smart_rtmpd 的 url api 接口
// --------------------------------------------
function get_url(path) {
    return "http://" + config.media.host + ":" + config.media.port + path;
}

// --------------------------------------------
// 更改密码
// --------------------------------------------
exports.change_password = function(req, res) {
    var pwd = crypt_passwd("123456");
    pwd = crypt_passwd(pwd);
    if ( fs.existsSync(pwdfile) ) {
        pwd = fs.readFileSync(pwdfile, "utf-8");        
    }

    if ( pwd != req.body['oldpwd'] ) {
        console.log(req.body);
        console.log(pwd);
        fail_response ( res, "password not match" ) ;
    } else {
        fs.writeFileSync(pwdfile, req.body['newpwd']);  
        succ_response ( res, {} ) ;
    }
}

// --------------------------------------------
// 登录处理
// --------------------------------------------
exports.login = function(req, res) {
    var pwd = crypt_passwd("123456");
    pwd = crypt_passwd(pwd);
    if ( fs.existsSync( pwdfile ) ) {
        pwd = fs.readFileSync(pwdfile, "utf-8");
    }   
    console.log(pwd);
    console.log(req.body);

    if ( pwd == req.body['pwd'] ) {
        const token = jwt.sign({
                username: "admin"
            }, config.jwt.secret, {
                algorithm: config.jwt.algorithm, 
                expiresIn: config.jwt.expires
            }
        );  
        succ_response ( res, { "token": token } ) ;
    } else {
        fail_response ( res, "password not match" ) ;       
    }
}

// --------------------------------------------
// 启动服务
// --------------------------------------------
exports.start_server = function (req, res) {

    var cmdstr = './cmd.sh start';
    if ( os_utils.get_os_platform() == 'win32' ) {
        cmdstr = 'cmd.bat start';
    }
    child_process.exec(cmdstr, {timeout: 1000}, 
        function (error, stdout, stderr) {
            if ( error !== null ) {
                fail_response(res, error, null);
                console.log('start service error: ' + error);
            } else {
                succ_response(res, {});
            }
        });
}

// --------------------------------------------
// 停止服务
// --------------------------------------------
exports.stop_server = function (req, res) {

    var cmdstr = './cmd.sh stop';
    if ( os_utils.get_os_platform() == 'win32' ) {
        cmdstr = 'cmd.bat stop';
    }
    console.log(cmdstr);
    child_process.exec(cmdstr, {timeout: 1000},
        function (error, stdout, stderr) {
            if (error !== null) {
                fail_response(res, error, null);
                console.log('stop service error: ' + error);
            } else {
                console.log(cmdstr);
                succ_response(res, {});
            }
        });
}

// --------------------------------------------
// 重启服务
// --------------------------------------------
var restart_service = function () {
    return new Promise((resolve, reject) => {
        var cmdstr = './cmd.sh restart';
        if ( os_utils.get_os_platform() == 'win32') {
            cmdstr = 'cmd.bat restart';
        }
        child_process.exec(cmdstr, {timeout: 1000},
            async function (error, stdout, stderr) {
                if (error !== null) {
                    reject(error);
                } else {                
                    resolve(stdout);
                }
            });
        });
}

// --------------------------------------------
//  恢复服务
// --------------------------------------------
var restore_service = function () {
    return new Promise((resolve, reject) => {
        var cmdstr = './cmd.sh restore';
        if ( os_utils.get_os_platform() == 'win32') {
            cmdstr = 'cmd.bat restore';
        }
        child_process.exec(cmdstr, {timeout: 1000},
            async function (error, stdout, stderr) {
                if (error !== null) {
                    reject(error);
                } else {                
                    resolve(stdout);
                }
            });
        });
}

// --------------------------------------------
// 重启服务
// --------------------------------------------
exports.restart_server = async function (req, res) {
    co(function* () {
        const result = yield restart_service();
        // 返回的结果是备份文件名字
        succ_response( res, {} );
    }).catch(async err=>{
        fail_response( res, err.code, err.stack );
    });
}

// --------------------------------------------
// 设置语言
// --------------------------------------------
exports.set_lang = function (req, res) {
    // 上传语言包
    if ( req.query['cmd'] == 'add' )  {
        var lang = req.body;
        var result = '{"lang":[]}';
        var langpath = "html/lang/lang.json";
        var langfile = "html/lang/" + lang['file'];
        if (fs.existsSync(langpath)) {
            result = fs.readFileSync(langpath, "utf-8");
        }
        var value = {
            'name': lang['name'],
            'file': lang['file']
        };
        var find = false;
        var index = JSON.parse(result);
        for (var i = 0; i < index['lang'].length; i++ ) {
            if ( index['lang'][i]['name'] == lang['name'] ) {
                if ( index['lang'][i]['file'] != lang['file'] ) {
                    fs.unlinkSync('html/lang/' + index['lang'][i]['file']);
                }
                index['lang'][i]['file'] = lang['file'];
                find = true;
                break;
            }
        }
        if ( false == find ) {
            index['lang'].push(value);
        }
        fs.writeFileSync(langpath, JSON.stringify(index, "utf-8"));
        fs.writeFileSync(langfile, lang['data']);
        succ_response ( res, {} ) ;
    // 删除语言包
    } else if ( req.query['cmd'] == 'del' ) {
        var name = req.body;
        var langpath = "html/lang/lang.json";
        var result = '{"lang":[]}';
        if ( fs.existsSync(langpath) ) {
            result = fs.readFileSync(langpath, "utf-8");
        }
        var index = JSON.parse(result);
        for (var i = 0; i < index['lang'].length; i++) {
            if ( index['lang'][i]['name'] == name['name'] ) {
                fs.unlinkSync('html/lang/' + index['lang'][i]['file']);
                index['lang'].splice(i,1);
                break;
            }
        }
        fs.writeFileSync(langpath, JSON.stringify(index, "utf-8"));     
        succ_response ( res, {} ) ;
    // 从索引文件内删除
    } else {
        fail_response( res, "no include cmd", null );
    }
}

// --------------------------------------------
// 获取语言包
// --------------------------------------------
exports.get_lang = function (req, res) {
    if ( req.query['file'] ) {
        var langfile = "html/lang/" + req.query['file'];
        var langdata = fs.readFileSync(langpath);
        succ_respons ( res, langdata ) ;
    } else {
        var langpath = "html/lang/lang.json";
        var result = fs.readFileSync(langpath, "utf8");
        var data = JSON.parse(result);
        succ_response ( res, data['lang'] ) ;
    }
}

// --------------------------------------------
// 遍历目录
// --------------------------------------------
function* read_dir(logpath, month) {
    var fileList=[];
    var files = yield readdir(logpath);
    if ( files && files.length ) {
        files.forEach(function(filename){

            fileList.push(filename);
        });
    }
    return fileList;
}

// --------------------------------------------
// 获取日志文件列表
// --------------------------------------------
exports.get_logfile = async function (req, res) {
    var logpath = config.binpath + "log";   
    co(function*(){
        if ( req.query["name"] ) {
            var logfile = logpath + '/' + req.query["name"];
            if (fs.existsSync(logfile)) {
                fs.readFile(logfile, (err, data) => {
                    if (err) {
                        res.end(err);
                        return;
                    }
                    res.writeHead(200, {
                        'Content-Disposition': 'attachment; filename=' + req.query["name"],
                        'content-type': 'application/octet-stream',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'X-Requested-With',
                        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
                    });
                    fs.createReadStream(logfile).pipe(res);
                });
            } else {
                fail_response ( res, 'file not found' );
            }
        } else {
            var month = req.query["month"];
            succ_response( res, yield read_dir(logpath, month) );
        }
        console.log(logpath);
    }); 
}

// ---------------------------------------------
//
// ---------------------------------------------
function read_line_file(path, line, callback) {
    var fRead = fs.createReadStream(path);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (data) {
        if (arr.length > 60) {
            arr.shift();
        }
        if ( os_utils.get_os_platform() == 'win32') {
            data = iconv.decode(data, 'utf-16');
        }
        arr.push(data);
    });
    objReadline.on('close',function () {
        callback(arr);
    });
}

// --------------------------------------------
// 获取日志文件内容
// --------------------------------------------
exports.get_logmsg = function (req, res) {
    var dtstr = date.format(new Date(), 'YYYYMMDD');
    var logpath = config.binpath + "log/" + dtstr + ".log";
    var result = '';

    if (fs.existsSync(logpath)) {
        read_line_file(logpath, 60, function (arr) {
    	    succ_response( res, arr );
        });
    } else {
        fail_response ( res, "file not found" );
    }    
}

// --------------------------------------------
// 获取系统信息
// --------------------------------------------
exports.system_info = async function(req, res) {
    succ_response( res, await os_utils.get_os_info() );
}

// --------------------------------------------
// 与 smart_rtmpd 进行通讯
// --------------------------------------------
function* req_smart_rtmpd(req_cmd, req_url, body=null) {
    var option = { 
        url: req_url,
        method: req_cmd,
        timeout: config.media.timeout
    };
    if (req_cmd == "POST") {
        option['json'] = true;
        option['headers'] = {
            "content-type": "application/json",
        };
        option['body'] = body;
    }
    return new Promise((resolve, reject) => {
        request(option, (err, res, body) => {
            var data = {
                "code": (err) ? 1 : 0,
                "msg": (err) ? err : body,
            };
            if (res && res.statusCode != 200) {
                console.log(req_url);
                console.log(res.statusCode + "-" + res.statusMessage);
                data["code"] = 1 ;
                data["msg"] = res.statusCode + "-" + res.statusMessage;
            }
            resolve(data);
        });
    });
};

// --------------------------------------------
// 获取直播流信息
// --------------------------------------------
exports.get_stream = function(req, res) {
    var url = get_url(config.media.stream);
    if (req.query["name"]) {
        url += "?name=" + req.query["name"];
        if (req.query["type"]) {
            url += "&type=" + req.query["type"];
        }
		if (req.query["vhost"])	{
			url += "&vhost=" + req.query["vhost"];
		}
    }

    console.log(url);
	console.log(req.query);
    co(function* () {
        const result = yield req_smart_rtmpd("GET", url);
        if (result["code"] == 1) {
            fail_response( res, result["msg"] );
        } else {
            succ_response( res, JSON.parse(result["msg"]) );
        }
    });
}

// --------------------------------------------
// 获取配置
// --------------------------------------------
exports.get_config = function(req, res) {
    var url = get_url(config.media.config);
    co(function* () {
        const result = yield req_smart_rtmpd("GET", url);
        if (result["code"] == 1) {
            fail_response( res, result["msg"] );
        } else {
            succ_response( res, JSON.parse(result["msg"]) );
        }
    });
}

// ---------------------------------------------
// 保存配置
// ---------------------------------------------
function save_config() {
    return new Promise((resolve, reject) => {
        fs.writeFile('./config.json', JSON.stringify(config), function (error) {
            if (error) {
                resolve(error);
            } else {
                resolve(null);
            }
        }); 
    });
}

// --------------------------------------------
// 设置配置
// --------------------------------------------
exports.set_config = function(req, res) {
    var url = get_url(config.media.config);
    console.log(req.body);
    co(function* () {
        const result = yield req_smart_rtmpd("POST", url, req.body);
        if (result["code"] == 1) {
            fail_response( res, result["msg"] );
        } else {
            console.log(result);
            var old_port = config.media.port;
            var new_port = result["msg"]["http_port"];
            var bak_config = result["msg"]["bak_config"];
            // 重启服务
            yield restart_service();
            // 获取服务状态
            config.media.port = new_port;
            yield sleep(config.restart);
            url = get_url(config.media.status);
            console.log(url);
            const status = yield req_smart_rtmpd("GET", url);
            if (status["code"] == 1) {
                config.media.port = old_port ;
                // 启动失败，则恢复旧配置启动
                yield restore_service();
                fail_response( res, status["msg"] );
            } else {
                // 保存新配置
                yield save_config();
                // 启动成功，则返回成功
                succ_response( res, {} );
            }           
        }
    });
}

// --------------------------------------------
// 获取服务状态
// --------------------------------------------
exports.get_service = function (req, res) {
    var url = get_url(config.media.status);
    co(function* () {
        console.log(url);
        var result = yield req_smart_rtmpd("GET", url);
        if (result["code"] == 1) {
            fail_response( res, result["msg"] );
        } else {
            var status = JSON.parse(result["msg"]);
            // 服务器还在启动过程中，需要等待
            if ( status['http'].run && status['start_time'] == '') {
                sleep(1000);
                while ( true ) {
                    result = yield req_smart_rtmpd("GET", url);
                    if (result["code"] == 1) {
                        fail_response( res, result["msg"] );
                        return;
                    } else {
                        status = JSON.parse(result["msg"]);
                        if ( status['http'].run && status['rtmp'].run == false) {
                            sleep(1000);
                            continue ;
                        }
                        succ_response( res, status );
                        return ;                        
                    }
                }
            }
            succ_response( res, status );
        }
    });
}

// --------------------------------------------
// 获取转发策略
// --------------------------------------------
exports.get_policy = function (req, res) {
    var url = get_url(config.media.policy);
    co(function* () {
        const result = yield req_smart_rtmpd("GET", url);
        if (result["code"] == 1) {
            fail_response( res, result["msg"] );
        } else {
            succ_response( res, JSON.parse(result["msg"]) );
        }
    });
}

// --------------------------------------------
// 设置转发策略
// --------------------------------------------
exports.set_policy = function (req, res) {
    var url = get_url(config.media.policy);
    co(function* () {
        console.log(req.body);
        const result = yield req_smart_rtmpd("POST", url, req.body);
        if (result["code"] == 1) {
            fail_response( res, result["msg"] );
        } else {
            succ_response( res, {} );
        }
    });
}

// -------------------------------------------
// 文件上传
// -------------------------------------------
exports.upload_file = function (req, res) {
    var des_file = 'upload/' + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            res.header("Access-Control-Allow-Origin", "*");
            if ( err ) {
                console.log( err );
                fail_response( res, err );
            } else {
                var response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
                };
                succ_response( res, response );
            }
            fs.unlinkSync(req.files[0].path);           
        });
    });
}
