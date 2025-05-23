const Joi = require("joi");

module.exports = Joi.object().keys({
    bookId: Joi.number().integer().required(),
    content: Joi.string().required()
});