'use strict';

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

server.listen(config.port, () => {
    logger.info("server start success(%s)!", config.port);
});

// 可以解析 req.body 参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/api/login', command.login);
app.post('/api/config', command.set_config);
app.post('/api/lang', command.set_lang);
app.post('/api/user', command.set_user);
app.get('/api/start', command.start_server);
app.get('/api/stop', command.stop_server);
app.get('/api/restart', command.restart_server);
app.get('/api/service', command.get_service);
app.get('/api/sysinfo', command.system_info);
app.get('/api/config', command.get_config);
app.get('/api/user', command.get_user);
app.get('/api/stream', command.get_stream);
app.get('/api/logfile', command.get_logfile);
//app.delete('/internal/cluster/inactive', utils.checkClientIp, docsCoServer.shutdown);
//app.post('/coauthoring/CommandService.ashx', utils.checkClientIp, rawFileParser, docsCoServer.commandFromServer);

app.use(cors());
app.use(express.static(path.join(__dirname,'html')));
/*
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid.v1() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
*/

process.on('uncaughtException', (err) => {
    logger.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});
