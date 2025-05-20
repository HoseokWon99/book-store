const Joi = require('joi');

module.exports = Joi.object().keys({
    cartId: Joi.number().required()
});