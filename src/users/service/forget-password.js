//@ts-check
const getUserBy = require("./get-user-by");
const { randomUUID } = require("crypto");
const redis = require("../../config/redis");

/**
 *
 * @param {string}email
 * @returns {Promise<string>}
 */
async function forgetPassword(email) {
    const { id } = await getUserBy({ email });
    const token = randomUUID().replaceAll('-', '');
    await redis.set(token, id, "PX", 300000);
    return token;
}

module.exports = forgetPassword;