'use strict';

const Tag = require('../model/tag');

module.exports = {
  findAllTags: (tx) => Tag.query(tx)
};
