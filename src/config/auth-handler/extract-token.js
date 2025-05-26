const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 *
 * @param {import("express").Request} req
 * @returns {string}
 */
module.exports = function (req) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("bearer "))
        throw httpError(StatusCodes.UNAUTHORIZED);

    return authorization.replace("bearer ", '');
};