'use strict';

const { Model } = require('objection');

class Tag extends Model {
  static get tableName() {
    return 'tag';
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

module.exports = Tag;
