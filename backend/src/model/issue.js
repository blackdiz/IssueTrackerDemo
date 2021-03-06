'use strict';

const BaseModel = require('./base-model');
const { Model } = require('objection');

class Issue extends BaseModel {
  static get tableName() {
    return 'issue';
  }

  constructor(props) {
    super(props);
    this.createTime = this.createTime;
    this.lastUpdateTime = this.lastUpdateTime;
  }

  static get relationMappings() {
    return {
      priority: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/priority`,
        join: {
          from: 'issue.priority_id',
          to: 'priority.id'
        }
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/status`,
        join: {
          from: 'issue.status_id',
          to: 'status.id'
        }
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/tag`,
        join: {
          from: 'issue.tag_id',
          to: 'tag.id'
        }
      }
    };
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['projectId', 'title', 'statusId', 'priorityId', 'tagId', 'creator'],

      properties: {
        projectId: { type: 'string', maxLength: 50 },
        title: { type: 'string', maxLength: 100 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        priorityId: { type: 'integer' },
        tagId: { type: 'integer' },
        assignAccount: { type: ['string', 'null'], maxLength: 20 },
        estimateWorkHour: { type: 'integer' },
        startDate: { type: ['string', 'null'] },
        endDate: { type: ['string', 'null'] },
        finishPercent: { type: 'integer', minimum: 0, maximum: 100 },
        creator: { type: 'string', maxLength: 20 }
      }
    };
  }
}

module.exports = Issue;
