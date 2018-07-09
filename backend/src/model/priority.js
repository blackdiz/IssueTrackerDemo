'use strict';

const { Model } = require('objection');

class Priority extends Model {
  static get tableName() {
    return 'priority';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: { type: 'string', maxLength: 10 }
      }
    };
  }
}

module.exports = Priority;
