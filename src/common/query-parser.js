const { isExists } = require("date-fns");
const httpError = require("http-errors");

/**
 * @typedef {import("./typedef").Handler} Handler
 * @typedef {import("joi").ObjectSchema<*>} Schema
 * @typedef {
 * Partial<{ each: boolean; }> &
 * { transformer: function(string): * | Array<{ propName: string; transform: function(string): * | undefined }> }
 * } TransformerOptions
 */

/**
 *
 * @param {Schema} schema
 * @returns {function(*): *}
 */
function queryParser(schema) {
    const desc = schema.describe();

    return function (query) {
        const data = {};

        for (const [key, { metas }] of Object.entries(desc.keys)) {
            if (!query[key]) continue;

            /** @type{TransformerOptions | undefined} */
            const options = metas && metas[0];

            if (!options) {
                data[key] = query[key];
                continue;
            }

            const { transformer, each } = options;

            if (transformer instanceof Array) {

                data[key] = Object.fromEntries(
                    query[key].split(',').map((val, idx) => {
                        const { propName, transform } = transformer[idx];
                        return [propName, transform ? transform(val) : val];
                    })
                );

            }
            else {
                data[key] = each
                    ? query[key].split(',').map(transformer)
                    : transformer(query[key]);
            }

        }

        return data;
    };
}

module.exports = { queryParser };