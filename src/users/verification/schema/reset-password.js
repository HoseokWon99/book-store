const Joi = require("joi");

exports.params = Joi.object().keys({
    token: Joi.string().length(32).required()
});

exports.body = Joi.object().keys({
    password: Joi.string()
        .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}\[\]:;"'<>,.?/\\]).{8,15}$/)
        .required()
});