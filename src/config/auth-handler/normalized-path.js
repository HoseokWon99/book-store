//@ts-check

/**
 *
 * @param {import("express").Request} req
 * @returns {string}
 */
module.exports = function (req) {
    const path = req.originalUrl.split('?')[0];
    const params = req.params || {};

    return Object.entries(params)
        .reduce(
            (
                acc,
                [key, val]
            ) => acc.replace(val, `:${key}`),
            path
        );
};