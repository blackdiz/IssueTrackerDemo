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
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'password', 'email', 'active'],

      properties: {
        name: { type: 'string', maxLength: 20 },
        password: { type: 'string', maxLength: 255 },
        firstName: { type: 'string', maxLength: 20 },
        lastName: { type: 'string', maxLength: 20 },
        email: { type: 'string', maxLength: 50 },
        active: { type: 'boolean' }
      }
    };
  }
}

module.exports = Account;
