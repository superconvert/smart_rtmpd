'use strict';

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

exports.system_info = function(req, res) {
    logger.info("system info");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('{}'));
}

exports.set_config = function(req, res) {
}

exports.get_config = function(req, res) {
}

