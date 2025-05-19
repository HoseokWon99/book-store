const Joi = require('joi');

module.exports = Joi.object().keys({
    bookId: Joi.number().required(),
    deltaQuantity: Joi.number().required()
});