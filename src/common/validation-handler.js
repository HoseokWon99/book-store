

/**
 * @typedef {import("joi").ObjectSchema<*>} Schema
 * @typedef {{ target: string; schema: Schema }} Validator
 */

/**
 *
 * @param {Validator[]} validators
 * @returns {import("./typedef").Handler}
 */
function validationHandler(validators) {
    return function(req, res, next) {

        for (const { target, schema } of validators) {
           const { error } = schema.validate(req[target]);

           if (error) {
               console.error(error);
               return res.sendStatus(422);
           }
        }

        return next();
    };
}

/**
 *
 * @param { Schema }schema
 * @returns {Validator}
 */
function query(schema) {
    return { target: "query", schema: schema };
}

/**
 *
 * @param { Schema }schema
 * @returns {Validator}
 */
function params(schema) {
    return { target: "params", schema: schema };
}

/**
 *
 * @param { Schema }schema
 * @returns {Validator}
 */
function body(schema) {
    return { target: "body", schema: schema };
}

module.exports = { validationHandler, query, params, body };