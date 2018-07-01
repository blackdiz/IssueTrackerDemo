'use strict';

const { Model, snakeCaseMappers } = require('objection');

class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    if (Object.prototype.hasOwnProperty.call(this, 'createTime')) {
      this.createTime = new Date().toISOString();
    }
    if (Object.prototype.hasOwnProperty.call(this, 'lastUpdateTime')) {
      this.lastUpdateTime = new Date().toISOString();
    }
  }

  $beforeUpdate() {
    if (Object.prototype.hasOwnProperty.call(this, 'lastUpdateTime')) {
      this.lastUpdateTime = new Date().toISOString();
    }
  }
}

module.exports = BaseModel;
