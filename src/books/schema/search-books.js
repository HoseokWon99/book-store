const Joi = require('joi');
const { arrayOf, rangeOf, pairOf } = require("../../utils/regex");
const { parseDate } = require("../../utils/date");

module.exports = Joi.object().keys({
    page: Joi.number().min(1).required().meta({ transformer: Number }),
    limit: Joi.number().min(5).required().meta({ transformer: Number }),
    keyword: Joi.string(),
    categories: Joi.string().pattern(arrayOf("\\d+")).meta({ each: true, transformer: Number }),
    pubOn: Joi.string().pattern(rangeOf("\\d{4}(0[1-9]|1[0-2])([0-2][0-9]|3[0-1])"))
        .meta({ each: true, transform: parseDate }),
    price: Joi.string().pattern(rangeOf("\\d+")).meta({ transformer: Number }),
    likes: Joi.string().pattern(rangeOf("\\d+")).meta({ transformer: Number }),
    sort: Joi.string().pattern(pairOf("(pubOn|price|likes)", "(ASC|DESC)"))
        .meta({ transformer: [{ propName: "by" }, { propName: "order" }] })
});