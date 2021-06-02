'use strict';

const url = require('url');
const jwt = require('jsonwebtoken');
const request = require('request');
const config = require('./config');
const sqlite = require('./sql_utils');


/*
jwt.verify(token, config.jwt.secret, function(err, decoded) {
    console.log(decoded);
});
*/

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

exports.start_server = function (req, res) {
    child_process.exec('./cmd.sh start',
      function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    /*
    child_process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'},
      function (error,stdout,stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    */
    logger.info("start server!");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('{}'));
}

exports.stop_server = function (req, res) {
    logger.info("stop server!");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('{}'));
}

exports.restart_server = function (req, res) {
    logger.info("restart server!");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('{}'));
}

exports.set_lang = function (req, res) {
}

exports.get_logfile = function (req, res) {
}

exports.system_info = function(req, res) {
    logger.info("system info");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('{}'));
}

exports.set_user = function(req, res) {
}

exports.get_user = function(req, res) {
    sqlite.get_users(req, res);
}

exports.get_stream = function(req, res) {
	var url = config.media.stream;
	if (req.query["name"]) {
		url += "?name=" + req.query["name"];
		if (req.query["type"]) {
			url += "&type=" + req.query["type"];
		}
	}
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var data = {}
			data["code"] = 0;
			data["msg"] = "ok";
			data["data"] = JSON.parse(body);
            res.send(data);
        } else {
			
        }
    });
}

exports.get_config = function(req, res) {
	var url = config.media.config;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var data = {}
			data["code"] = 0;
			data["msg"] = "ok";
			data["data"] = JSON.parse(body);
            res.send(data);
        } else {
			
        }
    });
}

exports.set_config = function(req, res) {
    console.log(req.body);
    /*
    request({
            url: config.media.config,
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
    */
}

exports.get_service = function (req, res) {
    var url = config.media.status;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = {};
			data["code"] = 0;
			data["msg"] = "ok";
			data["data"] = JSON.parse(body);
		    res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } else {
			
        }
    });
}

