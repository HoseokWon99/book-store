const { createToken, verifyToken } = require("../../config/jwt");

/**
 *
 * @param {string} refreshToken
 * @returns {Promise<string>}
 */
async function renew(refreshToken) {
    const { id, email } = verifyToken(refreshToken);

    return createToken({
        id, email,
        exp: Number(process.env.JWT_ACCESS_TOKEN_DURATION)
    });
}

module.exports = renew;