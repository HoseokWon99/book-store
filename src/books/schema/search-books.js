const Joi = require('joi');
const { arrayOf, rangeOf, pairOf } = require("../../utils/regex");

module.exports = Joi.object().keys({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(5).required(),
    keyword: Joi.string().optional(),
    categories: Joi.string().pattern(arrayOf("\\d+")).optional(),
    pubOn: Joi.string().pattern(rangeOf("\\d{4}(0[1-9]|1[0-2])([0-2][0-9]|3[0-1])")).optional(),
    price: Joi.string().pattern(rangeOf("\\d+")).optional(),
    likes: Joi.string().pattern(rangeOf("\\d+")).optional(),
    sort: Joi.string().pattern(pairOf("(pubOn|price|likes)", "(ASC|DESC)")).optional()
})