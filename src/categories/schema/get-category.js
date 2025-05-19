const Joi = require('joi');

module.exports = Joi.object().keys({
   categoryId: Joi.number().required()
});