'use strict';

const url = require('url');
const http = require('http');
const cors = require('cors');
const uuid = require('uuid')
const express = require('express');
const session = require('express-session')
const config = require('./config')
const log4js = require('./log_utils');        // 引入库
const command = require('./cmd_utils');
const logger = log4js.getLogger('webserver'); // 获取指定的输出源
const app = express();
const server = http.createServer(app);

var path = require('path');
var rout = express.Router();
var child_process = require('child_process');

const url_post = {
    '/api/login' : command.login,
    '/api/config' : command.set_config,
    '/api/lang' : command.set_lang,
    '/api/user' : command.set_user,
    '/api/start' : command.start_server,
    '/api/stop' : command.stop_server,
    '/api/restart' : command.restart_server,
};

const url_get = {
    '/api/service' : command.get_service,
    '/api/sysinfo' : command.system_info,
    '/api/config' : command.get_config,
    '/api/user' : command.get_user,
    '/api/stream' : command.get_stream,
    '/api/logfile' : command.get_logfile
};

server.listen(config.port, () => {
    logger.info("server start success(%s)!", config.port);
});

// 可以解析 req.body 参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function jwt_verify(req) {
    const Uri = url.parse(req.url);
    const baseurl = Uri.pathname;
	if ( baseurl == "/" || baseurl == "/api/login" ) {
		return true ;
	}
	return true ;	
}

//token验证中间件
app.use((req, res, next) => {
    const Uri = url.parse(req.url);
    const baseurl = Uri.pathname;
    if (req.method == 'GET') {
        let cb = url_get[baseurl];
        if ( cb ) {
            cb ( req, res ) ;
        } else {
			let token = req.authentication;
			if (baseurl.endsWith(".html")) {
				console.log(baseurl);
			}
            next();
        }
    } else if (req.method == 'POST') {
        let cb = url_post[baseurl];
        if ( cb ) {
            cb ( req, res ) ;
        } else {
            next();
        }
    } else {
        next () ;
    }
});

// 这个放到前面，否则静态路径 html 会提前拦截这个消息
app.get('/', function(req, res, next){
    var session = req.session;
    var isLogined = !!session;
    if (isLogined) {
      logger.info("has logined.");
      next;
    } else {
      logger.info("no logined.");
      res.sendFile(path.join(__dirname, '/html/page/login-1.html'));
    }
});

app.use(cors());
app.use(express.static(path.join(__dirname,'html')));

process.on('uncaughtException', (err) => {
    logger.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});
