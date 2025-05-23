const Joi = require('joi');

module.exports = Joi.object().keys({
    itemIds: Joi.array().items(Joi.number().required()).required()
});