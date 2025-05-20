const Joi = require("joi");

module.exports = Joi.object().keys({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
});