'use strict';

const { transaction } = require('objection');
const { types } = require('pg');
const moment = require('moment-timezone');
const dbConfig = require('../config/db-config.js');
const logger = require('../config/logger');

types.setTypeParser(1082, (val) => val);
types.setTypeParser(1184, (val) => moment(val).format());

logger.info('Connect to the database at: ' + JSON.stringify(dbConfig));
const conn = require('knex')({
  client: 'pg',
  connection: dbConfig
});

module.exports = async () => transaction.start(conn);
