'use strict';

const { Model } = require('objection');

class Account extends Model {
  static get tableName() {
    return 'account';
  }

  static get idColumn() {
    return 'name';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Account;
