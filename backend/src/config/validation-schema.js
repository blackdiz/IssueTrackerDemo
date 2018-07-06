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
          description: Joi.string().required(),
          isPublic: Joi.boolean().required()
        })
    }
  }
};
