'use strict';

const url = require('url');
const http = require('http');
const cors = require('cors');
const uuid = require('uuid');
const express = require('express');
const session = require('express-session');
const config = require('./config')
const log4js = require('./log_utils');        // 引入库
const command = require('./cmd_utils');
const sqlutils = require('./sql_utils');
const logger = log4js.getLogger('webserver'); // 获取指定的输出源
const app = express();
const server = http.createServer(app);

var path = require('path');

const url_post = {
    '/api/user' : sqlutils.set_user,
    '/api/login' : command.login,
    '/api/lang' : command.set_lang,
    '/api/config' : command.set_config,
	'/api/policy' : command.set_policy,
    '/api/start' : command.start_server,
    '/api/stop' : command.stop_server,
    '/api/restart' : command.restart_server,
	'/api/upload': command.upload_file,
	'/api/password': command.change_password,
};

const url_get = {
    '/api/user' : sqlutils.get_user,
    '/api/lang' : command.get_lang,
    '/api/service' : command.get_service,
    '/api/sysinfo' : command.system_info,
    '/api/config' : command.get_config,
	'/api/policy' : command.get_policy,
    '/api/stream' : command.get_stream,
    '/api/logfile' : command.get_logfile,
	'/api/logmsg' : command.get_logmsg
};

server.listen(config.port, () => {
    logger.info("server start success(%s)!", config.port);
});

// 可以解析 req.body 参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
			let token = req.Authorization;
			if (baseurl.endsWith(".html")) {
				console.log(baseurl);
				console.log(token);
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

const sqlitedb = require('./sql_db.js').sqlitedb;
var sqliteDB = new sqlitedb("smart_web.db");

app.use(cors());
app.use(express.static(path.join(__dirname,'html')));

process.on('uncaughtException', (err) => {
    logger.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});
