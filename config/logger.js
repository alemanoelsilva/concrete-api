const path = require('path');
const bunyan = require('bunyan');
const RotatingFileStream = require('bunyan-rotating-file-stream');

const { logger: { level, backupFileLog } } = require('./environment');

module.exports = bunyan.createLogger({
  name: 'concreteAPI',
  streams: [{
    stream: process.stdout
  }, {
    stream: new RotatingFileStream({
      path: path.join(path.resolve(), backupFileLog),
      period: '7d',
      totalFiles: 10,
      rotateExisting: true,
      threshold: '10m',
      totalSize: '20m',
      gzip: false
    })
  }],
  level,
});
