'use strict';

const co = require('co');
const fs = require('fs');
const url = require('url');
const path = require('path');
const jwt = require('jsonwebtoken');
const date = require('silly-datetime');
const iconv = require('iconv-lite');
const request = require('request');
const thunkify = require('thunkify');
const child_process = require('child_process');
const config = require('./config');
const os_utils = require('./os_utils');

var readdir=thunkify(fs.readdir);

// --------------------------------------------
// ��ȡ�� smart_rtmpd �� url api �ӿ�
// --------------------------------------------
function get_url(path) {
	return "http://" + config.media.root + path;
}

// --------------------------------------------
// ��¼����
// --------------------------------------------
exports.login = function(req, res) {
    const token = jwt.sign({
            username: "freeabc"
        }, config.jwt.secret, {
            algorithm: config.jwt.algorithm, 
            expiresIn: config.jwt.expires
        }
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({token}));
    console.log(token);
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
				console.log('exec error: ' + error);
			} else {
				console.log(stdout);				
			}
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify('{}'));
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
    child_process.exec(cmdstr, {timeout: 1000},
		function (error, stdout, stderr) {
		    if (error !== null) {
				console.log('exec error: ' + error);
		    } else {
			}
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify('{}'));
		});
}

// --------------------------------------------
// ��������
// --------------------------------------------
exports.restart_server = async function (req, res) {
	// �����ϵ������ļ�
    await backup_config();
	var cmdstr = 'cmd.sh restart';
	if ( os_utils.get_os_platform() == 'win32')	{
		cmdstr = 'cmd.bat restart';
	}
	child_process.exec(cmdstr, {timeout: 1000},
		async function (error, stdout, stderr) {
			if (error !== null) {
		      console.log('exec error: ' + error);
			  await restore_config();
			} else {
				// ̽���Ƿ���������
		    }
		    res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify('{}'));
		});
		// ��������
		// ̽���Ƿ���������	
}

// --------------------------------------------
// ���������ļ�
// --------------------------------------------
var backup_config = function () {
	return new Promise((resolve, reject) => {
		var cfgfile = config.binpath + "config.xml";
	    var readable = fs.createReadStream( cfgfile );
	    var writable = fs.createWriteStream( "config.xml.bak" ); 
	    readable.pipe( writable );
		readable.on('end', function() {
			resolve();
		});
	});
}

// --------------------------------------------
// ��ԭ�����ļ�
// --------------------------------------------
var restore_config = function () {
	return new Promise((resolve, reject) => {
		var cfgfile = config.binpath + "config.xml";
	    var readable = fs.createReadStream( "config.xml.bak" );
		var writable = fs.createWriteStream( cfgfile ); 
	    readable.pipe( writable );
		readable.on('end', function() {
			resolve();
		});
	});
}

// --------------------------------------------
// ��������
// --------------------------------------------
exports.set_lang = function (req, res) {
	if ( req.query['cmd'] == 'add' )  {
		// �޸����������ļ�
	} else if ( req.query['cmd'] == 'del' ) {
		// �������ļ���ɾ��
	} else {
		var data = {};
		data["code"] = 1;
		data["msg"] = "no inclued cmd";
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	}
}

// --------------------------------------------
// ����Ŀ¼
// --------------------------------------------
function* read_dir(logpath) {
	var files = yield readdir(logpath);
	var fileList=[];
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
		var data = {}
		data["code"] = 0;
		data["msg"] = "ok";
		data["data"] = yield read_dir(logpath);
		res.setHeader('Content-Type', 'application/json');
	    res.send(data);
	});	
}

// --------------------------------------------
// ��ȡ��־�ļ�����
// --------------------------------------------
exports.get_logmsg = function (req, res) {
	var dtstr = date.format(new Date(), 'YYYYMMDD');
	var logpath = config.binpath + "log/" + dtstr + ".log";
	var result = fs.readFileSync(logpath);
	if ( os_utils.get_os_platform() == 'win32')	{
		result = iconv.decode(result, 'utf-16');
	}	
	var line = 60 ;
	if ( req.query["line"] ) {
		line = parseInt(req.query["line"]);
	}
	var arr = result.split("\r\n");
	if ( arr.length > line ) {
		arr.splice(0,arr.length-line);
	}

	var data = {
		"code": 0,
		"msg": "ok",
		"data": arr
	};
	res.setHeader('Content-Type', 'application/json');
    res.send(data);
}

// --------------------------------------------
// ��ȡϵͳ��Ϣ
// --------------------------------------------
exports.system_info = async function(req, res) {
	var data = {
		"code": 0,
		"msg": "ok",
		"data": await os_utils.get_os_info()
	};
	res.setHeader('Content-Type', 'application/json');
    res.send(data);
}

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
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var data = {
				"code": 0,
				"msg": "ok",
				"data": JSON.parse(body)
			};
            res.send(data);
        } else {
			
        }
    });
}

// --------------------------------------------
// ��ȡ����
// --------------------------------------------
exports.get_config = function(req, res) {
	var url = get_url(config.media.config);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var data = {
				"code": 0,
				"msg": "ok",
				"data": JSON.parse(body)
			};
            res.send(data);
        } else {
			
        }
    });
}

// --------------------------------------------
// ��������
// --------------------------------------------
exports.set_config = function(req, res) {
    console.log(req.body);
    request({
            url: get_url(config.media.config),
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(req.body)
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
        }
    });    
}

// --------------------------------------------
// ��ȡ����״̬
// --------------------------------------------
exports.get_service = function (req, res) {
    var url = get_url(config.media.status);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var data = {
				"code": 0,
				"msg": "ok",
				"data": JSON.parse(body)
			};
		    res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
			
        }
    });
}

// --------------------------------------------
// ��ȡת������
// --------------------------------------------
exports.get_policy = function (req, res) {
    var url = get_url(config.media.policy);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var data = {
				"code": 0,
				"msg": "ok",
				"data": JSON.parse(body)
			};
		    res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
			
        }
    });
}

// --------------------------------------------
// ����ת������
// --------------------------------------------
exports.set_policy = function (req, res) {
	request({
            url: get_url(config.media.policy),
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(req.body)
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
        }
    });  
}