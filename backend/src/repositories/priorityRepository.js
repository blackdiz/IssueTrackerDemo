'use strict';

const Priority = require('../model/priority');

module.exports = {
  findAllPriorities: (tx) => Priority.query(tx).orderBy('order', 'asc')
};
