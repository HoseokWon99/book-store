const { isExists } = require("date-fns");
const httpError = require("http-errors");

/**
 *
 * @param {string} str
 * @returns {Date}
 */
function parseDate(str) {
    const year = parseInt(str.substring(0, 4));
    const month = parseInt(str.substring(4, 6));
    const day = parseInt(str.substring(6));
    if (!isExists(year, month, day)) throw httpError(422);
    return new Date(year, month, day);
}

module.exports = { parseDate };