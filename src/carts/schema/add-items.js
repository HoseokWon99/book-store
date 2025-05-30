const Joi = require('joi');

module.exports = Joi.object().keys({
    items: Joi.array().items(Joi.object().keys({
        bookId: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required()
    })).required()
});