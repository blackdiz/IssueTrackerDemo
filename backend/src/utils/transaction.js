'use strict';

const { transaction } = require('objection');
const conn = require('../config/db');

module.exports = async () => transaction.start(conn);
