const redis = require("../redis");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 *
 * @param {string} token
 * @returns {Promise<void>}
 */
module.exports = async function (token) {
  if (await redis.get(token) === "blacklisted")
    throw httpError(StatusCodes.FORBIDDEN);
};