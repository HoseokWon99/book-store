const Joi = require('joi');

module.exports = Joi.object().keys({
    itemIds: Joi.array().items(Joi.number().required()).required(),
    paidPrice: Joi.number().min(0).required(),
    address: Joi.string().min(1).required(),
    recipient: Joi.string().min(1).required(),
    tel: Joi.string().pattern(/^(\d{3})-(\d{3,4})-(\d{4})$/).required()
});