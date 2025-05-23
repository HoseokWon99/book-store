const Joi = require('joi');
const { arrayOf } = require("../../utils/regex");

module.exports = Joi.object().keys({
    itemIds: Joi.string().pattern(arrayOf("\\d+"))
        .meta({ each: true, transformer: Number }),
})