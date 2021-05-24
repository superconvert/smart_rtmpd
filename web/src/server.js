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

app.post('/login', command.login);
app.get('/start', command.start_server);
app.get('/stop', command.stop_server);
app.get('/restart', command.restart_server);
app.get('/sysinfo', command.system_info);
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
