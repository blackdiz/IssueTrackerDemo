'use strict';

const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

const myFormat = printf(info => `${info.timestamp} - ${info.level}: ${info.message}`);

const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    myFormat
  ),
  transports: [
    new transports.Console({
      level: 'debug'
    })
  ]
});

module.exports = logger;
