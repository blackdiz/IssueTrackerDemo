'use strict';

const BaseModel = require('./base-model');

class Account extends BaseModel {
  static get tableName() {
    return 'account';
  }

  static get idColumn() {
    return 'name';
  }

  constructor() {
    super();
    this.active = true;
    this.createTime = null;
    this.lastUpdateTime = null;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'password', 'active'],

      properties: {
        name: { type: 'string', maxLength: 20 },
        password: { type: 'string', maxLength: 255 },
        active: { type: 'boolean' }
      }
    };
  }
}

module.exports = Account;
