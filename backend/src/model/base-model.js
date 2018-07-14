'use strict';

const { Model, snakeCaseMappers } = require('objection');
const { DbErrors } = require('objection-db-errors');
const moment = require('moment-timezone');

class BaseModel extends DbErrors(Model) {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    if (Object.prototype.hasOwnProperty.call(this, 'createTime')) {
      this.createTime = moment(new Date()).format();
    }
    if (Object.prototype.hasOwnProperty.call(this, 'lastUpdateTime')) {
      this.lastUpdateTime = moment(new Date()).format();
    }
  }

  $beforeUpdate() {
    if (Object.prototype.hasOwnProperty.call(this, 'lastUpdateTime')) {
      this.lastUpdateTime = moment(new Date()).format();
    }
  }
}

module.exports = BaseModel;
