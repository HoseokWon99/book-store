const Joi = require('joi');

module.exports = Joi.object().keys({
    productsIds: Joi.array().items(Joi.number().required()).required()
});