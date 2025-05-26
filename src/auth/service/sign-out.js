const redis = require("../../config/redis");
const { ACCESS_EXPIRES } = require('../../config/jwt');

/**
 *
 * @param {string} token
 * @returns {Promise<void>}
 */
async function signOut(token) {
    await redis.set(token, "blacklisted", "PX", ACCESS_EXPIRES);
}

module.exports = signOut;