'use strict';

const jwt = require('jsonwebtoken');
const config = require('./config');
const sqlite = require('./sql_utils');

const token = jwt.sign({
        username: "freeabc"
    }, config.jwt.secret, {
        algorithm: config.jwt.algorithm, 
        expiresIn: config.jwt.expires
    }
);

jwt.verify(token, config.jwt.secret, function(err, decoded) {
    console.log(decoded);
});

exports.login = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('{}'));
    //res.sendStatus(404);
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

exports.get_service = function (req, res) {
    logger.info("get service!");
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
}

exports.get_config = function(req, res) {
    request(config.media.config, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the baidu homepage.
            res.send(body);
        }
    });
}

exports.set_config = function(req, res) {
    request({
            url: config.media.config,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(requestData)
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
        }
    });
}

