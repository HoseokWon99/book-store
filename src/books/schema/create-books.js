const Joi = require("joi");

module.exports = Joi.object().keys({
   items: Joi.array().items(Joi.object().keys({
       isbn: Joi.string().required(),
       title: Joi.string().required(),
       author: Joi.string().required(),
       pubOn: Joi.date().required(),
       price: Joi.number().required(),
       abstract: Joi.string().optional(),
       detail: Joi.string().optional(),
       categoryId: Joi.number().min(1).max(12).required()
   }))
});