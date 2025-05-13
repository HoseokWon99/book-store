/**
 *
 * @param {Object} obj
 * @param {function(string): string} transform
 * @returns {Object}
 */
const transformKeys = (obj, transform) => {
    return Object.entries(obj)
        .map(([k, v]) => [transform[k], v])
        .reduce(
            (acc, [k, v]) => acc[k] = v,
            {}
        );
};


/**
 *
 * @param {Object} obj
 * @returns {Object}
 */
const camelToSnake = (obj) => transformKeys(
    obj,
    (s) => s.replace(/([A-Z])/g, '_$1').toLowerCase()
);

/**
 *
 * @param {Object} obj
 * @returns {Object}
 */
const snakeToCamel = (obj) => transformKeys(
    obj,
    s => s.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
);

module.exports = { transformKeys, camelToSnake, snakeToCamel };