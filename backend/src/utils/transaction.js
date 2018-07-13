'use strict';

const { transaction } = require('objection');
const { types } = require('pg');
const moment = require('moment-timezone');
const dbConfig = require('../config/db-config.js');

types.setTypeParser(1082, (val) => val);
types.setTypeParser(1184, (val) => moment(val).format());

const conn = require('knex')({
  client: 'pg',
  connection: dbConfig
});

module.exports = async () => transaction.start(conn);
