const Joi = require("joi");

exports.Params = Joi.object().keys({
    bookId: Joi.number().required()
});

exports.Body = Joi.object().keys({
    abstract: Joi.string().optional(),
    detail: Joi.string().optional()
});