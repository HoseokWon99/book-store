const Joi = require("joi");

exports.params = Joi.object().keys({
    reviewId: Joi.number().integer().required()
});

exports.body = Joi.object().keys({
    content: Joi.string().required()
});