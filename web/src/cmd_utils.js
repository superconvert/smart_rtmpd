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

var readdir=thunkify(fs.readdir);

// ---------------------------------------------
// �ӳ�
// ---------------------------------------------
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ----------------------------------------------------------
// ��������
// ----------------------------------------------------------
function crypt_passwd (password) {
    var md5 = crypto.createHash('md5');
	return md5.update(password).digest('hex');
}

// --------------------------------------------
// ��Ӧ��ȷֵ��ǰ��
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
// ��Ӧ�����ֵ��ǰ��
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
// ��ȡ�� smart_rtmpd �� url api �ӿ�
// --------------------------------------------
function get_url(path) {
	return "http://" + config.media.host + ":" + config.media.port + path;
}

// --------------------------------------------
// ��¼����
// --------------------------------------------
exports.login = function(req, res) {
	var pwd = crypt_passwd("123456");
	pwd = crypt_passwd(pwd);
	if ( pwd == req.body['pwd']) {
		const token = jwt.sign({
			    username: "admin"
			}, config.jwt.secret, {
				algorithm: config.jwt.algorithm, 
	            expiresIn: config.jwt.expires
		    }
		);
	
		succ_response ( res, { "token": token } ) ;

	} else {
		console.log("xxxxxxxxxxxxxxxxxxxx");
		fail_response ( res, "password not match" ) ;
		
	}
}

// --------------------------------------------
// ��������
// --------------------------------------------
exports.start_server = function (req, res) {

	var cmdstr = 'cmd.sh start';
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
// ֹͣ����
// --------------------------------------------
exports.stop_server = function (req, res) {

	var cmdstr = 'cmd.sh stop';
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
// ��������
// --------------------------------------------
var restart_service = function () {
	return new Promise((resolve, reject) => {
		var cmdstr = 'cmd.sh restart';
		if ( os_utils.get_os_platform() == 'win32')	{
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
//  �ָ�����
// --------------------------------------------
var restore_service = function () {
	return new Promise((resolve, reject) => {
		var cmdstr = 'cmd.sh restore';
		if ( os_utils.get_os_platform() == 'win32')	{
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
// ��������
// --------------------------------------------
exports.restart_server = async function (req, res) {
	co(function* () {
		const result = yield restart_service();
		// ���صĽ���Ǳ����ļ�����
		succ_response( res, {} );
	}).catch(async err=>{
		fail_response( res, err.code, err.stack );
	});
}

// --------------------------------------------
// ��������
// --------------------------------------------
exports.set_lang = function (req, res) {
	// �ϴ����԰�
	if ( req.query['cmd'] == 'add' )  {
		var lang = req.body;
		var result = '{"lang":[]}';
	    var langpath = "lang/lang.json";
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
					fs.unlinkSync('lang/' + index['lang'][i]['file']);
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
	// ɾ�����԰�
	} else if ( req.query['cmd'] == 'del' ) {
		var name = req.body;
		var langpath = "html/lang/lang.json";
		var result = '{"lang":[]}';
		if(fs.existsSync(langpath)) {
			result = fs.readFileSync(langpath, "utf-8");
		}
		var index = JSON.parse(result);
		for (var i = 0; i < index['lang'].length; i++) {
			if ( index['lang'][i]['name'] == name['name'] ) {
				fs.unlinkSync('lang/' + index['lang'][i]['file']);
				index['lang'].splice(i,1);
				break;
			}
		}
		fs.writeFileSync(langpath, JSON.stringify(index, "utf-8"));		
		succ_response ( res, {} ) ;
	// �������ļ���ɾ��
	} else {
		fail_response( res, "no include cmd", null );
	}
}

// --------------------------------------------
// ��ȡ���԰�
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
// ����Ŀ¼
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
// ��ȡ��־�ļ��б�
// --------------------------------------------
exports.get_logfile = async function (req, res) {
	var logpath = config.binpath + "log";	
	co(function*(){
		console.log(logpath);
		if ( req.query["name"] ) {
			var logfile = logpath + '/' + req.query["name"];
			if (fs.existsSync(logfile)) {
				var result = fs.readFileSync(logfile);
				if ( os_utils.get_os_platform() == 'win32')	{
					result = iconv.decode(result, 'utf-16');
				}	
				succ_response( res, result );		
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
		if ( os_utils.get_os_platform() == 'win32')	{
			data = iconv.decode(data, 'utf-16');
		}
        arr.push(data);
    });
    objReadline.on('close',function () {
        callback(arr);
    });
}

// --------------------------------------------
// ��ȡ��־�ļ�����
// --------------------------------------------
exports.get_logmsg = function (req, res) {
	var dtstr = date.format(new Date(), 'YYYYMMDD');
	var logpath = config.binpath + "log/" + dtstr + ".log";
	var result = '';

	read_line_file(logpath, 60, function (arr) {
		succ_response( res, arr );
	});

	/*
	if (fs.existsSync(logpath)) {
		result = fs.readFileSync(logpath);
		if ( os_utils.get_os_platform() == 'win32')	{
			result = iconv.decode(result, 'utf-16');
		}	
		console.log(result);
	}
	var line = 60 ;
	if ( req.query["line"] ) {
		line = parseInt(req.query["line"]);
	}
	var arr = result.split("\r\n");
	if ( arr.length > line ) {
		arr.splice(0,arr.length-line);
	}
	console.log(arr);	
	succ_response( res, arr );
	*/
}

// --------------------------------------------
// ��ȡϵͳ��Ϣ
// --------------------------------------------
exports.system_info = async function(req, res) {
	succ_response( res, await os_utils.get_os_info() );
}

// --------------------------------------------
// �� smart_rtmpd ����ͨѶ
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
// ��ȡֱ������Ϣ
// --------------------------------------------
exports.get_stream = function(req, res) {
	var url = get_url(config.media.stream);
	if (req.query["name"]) {
		url += "?name=" + req.query["name"];
		if (req.query["type"]) {
			url += "&type=" + req.query["type"];
		}
	}

	console.log(url);
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
// ��ȡ����
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
// ��������
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
// ��������
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
			// ��������
			yield restart_service();
			// ��ȡ����״̬
			config.media.port = new_port;
			yield sleep(config.restart);
			url = get_url(config.media.status);
			console.log(url);
			const status = yield req_smart_rtmpd("GET", url);
			if (status["code"] == 1) {
				config.media.port = old_port ;
				// ����ʧ�ܣ���ָ�����������
				yield restore_service();
				fail_response( res, status["msg"] );
			} else {
				// ����������
				yield save_config();
				// �����ɹ����򷵻سɹ�
				succ_response( res, {} );
			}			
		}
	});
}

// --------------------------------------------
// ��ȡ����״̬
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
			// �������������������У���Ҫ�ȴ�
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
// ��ȡת������
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
// ����ת������
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
// �ļ��ϴ�
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