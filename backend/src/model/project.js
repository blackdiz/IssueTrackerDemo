'use strict';

const BaseModel = require('./base-model');
const { Model } = require('objection');

class Project extends BaseModel {
  static get tableName() {
    return 'project';
  }

  constructor() {
    super();
    this.createTime = this.createTime;
    this.lastUpdateTime = this.lastUpdateTime;
  }

  static get relationMappings() {
    return {
      accounts: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/account`,
        join: {
          from: 'project.id',
          through: {
            from: 'account_project.project_id',
            to: 'account_project.account_name'
          },
          to: 'account.name'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'creator'],

      properties: {
        id: { type: 'string', maxLength: 50 },
        name: { type: 'string', maxLength: 50 },
        creator: { type: 'creator', maxLength: 20 },
        isPublic: { type: 'boolean' }
      }
    };
  }
}

module.exports = Project;
