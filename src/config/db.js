'use strict';

module.exports = require('knex')({
  client: 'pg',
  connection: {
    user: 'blackdiz',
    password: 'black2603',
    host: 'localhost',
    port: '5432',
    database: 'issue_tracker',
    debug: true
  }
});
