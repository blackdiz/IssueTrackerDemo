'use strict';

const Status = require('../model/status');

module.exports = {
  findAllStatus: (tx) => Status.query(tx)
};
