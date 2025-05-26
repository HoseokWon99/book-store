const { createToken } = require("../../config/jwt");

/**
 * @typedef {{ id: number; email: string; }} UserDTO
 */

/**
 *
 * @param {UserDTO} dto
 * @returns {string}
 */
function renew(dto) {
    return createToken({
        ...dto,
        exp: Number(process.env.JWT_ACCESS_TOKEN_DURATION)
    });
}

module.exports = renew;