'use strict';

const Joi = require('joi');

module.exports = {
  project: {
    body: {
      project: Joi.object()
        .required()
        .keys({
          id: Joi.string()
            .max(50)
            .alphanum()
            .required(),
          name: Joi.string()
            .max(50)
            .required(),
          description: Joi.string().allow(''),
          isPublic: Joi.boolean().required()
        })
    }
  },
  issue: {
    body: {
      issue: Joi.object()
        .required()
        .keys({
          projectId: Joi.string()
            .max(50)
            .alphanum()
            .required(),
          title: Joi.string()
            .max(100)
            .required(),
          description: Joi.string().allow(''),
          statusId: Joi.number().required(),
          priorityId: Joi.number().required(),
          tagId: Joi.number().required(),
          assignedAccount: Joi.string()
            .allow(null)
            .max(20),
          estimateWorkHour: Joi.number().min(0),
          startDate: Joi.string().allow(null),
          endDate: Joi.string().allow(null),
          finishedPercent: Joi.number().max(100)
        })
    }
  }
};
