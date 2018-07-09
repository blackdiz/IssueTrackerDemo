'use strict';

const { Model } = require('objection');

class Status extends Model {
  static get tableName() {
    return 'status';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: { type: 'string', maxLength: 20 }
      }
    };
  }
}

module.exports = Status;
