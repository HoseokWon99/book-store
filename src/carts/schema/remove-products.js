const Joi = require('joi');

module.exports = Joi.object().keys({
    bookIds: Joi.string().pattern(/^\d+(,\d+)*$/)
})