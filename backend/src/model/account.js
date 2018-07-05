'use strict';

const BaseModel = require('./base-model');
const { Model } = require('objection');

class Account extends BaseModel {
  static get tableName() {
    return 'account';
  }

  static get idColumn() {
    return 'name';
  }

  constructor() {
    super();
    this.active = this.active;
    this.createTime = this.createTime;
    this.lastUpdateTime = this.lastUpdateTime;
  }

  static get relationMappings() {
    return {
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/project`,
        join: {
          from: 'account.id',
          through: {
            from: 'account_project.account_name',
            to: 'account_project.project_name'
          },
          to: 'project.id'
        }
      }
    };
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
