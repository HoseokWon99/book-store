const Joi = require("joi");

module.exports = Joi.object().keys({
    itemId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
});