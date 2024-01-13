/*
对log4js的简单封装实践：不同的模块使用不同的日志文件，配置在configure进行。
使用时，调用getLogger获取不同的appender，写入不同的日志文件。
将日志写入文件，然后使用tail -f xx.txt可实时查看，即使进行备份，也不影响
知识点：
每天备份：pattern为.yyyy-MM-dd.txt
每小时：pattern为.yyyy-MM-dd-mm.txt

*/
const log4js = require('log4js');

log4js.configure( {
  appenders: {
    console: {
        type: 'console',
    },
    datelog: {
        type: 'dateFile',
        filename: 'logs/server.log',
        pattern: ".yyyy-MM-dd.txt",
        // alwaysIncludePattern: true,
        // maxLogSize: 10, // 无效
        // backups: 5, // 无效
        compress: true,
        daysToKeep: 2,
    },
    // more...
  },
  categories: {
      default: {
          appenders: ['console', 'datelog'],
          level: 'debug',
      },
      // more...
  },
  
  // for pm2...
  pm2: true,
  disableClustering: true, // not sure...
}
);

function getLogger(type) {
    return log4js.getLogger(type);
}

module.exports = {
    getLogger,
}
