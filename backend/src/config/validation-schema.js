'use strict';

const Joi = require('joi');

module.exports = {
  project: {
    body: {
      project: Joi.object()
        .required()
        .keys({
          name: Joi.string().required(),
          description: Joi.string().required(),
          isPublic: Joi.boolean().required()
        })
    }
  }
};
