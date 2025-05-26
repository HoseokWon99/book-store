const { sign } = require("jsonwebtoken");

/**
 * @typedef {{
 *     id: number;
 *     email: string;
 *     exp: number;
 * }} CreateTokenDTO
 */

/**
 *
 * @param {CreateTokenDTO} dto
 * @returns {string}
 */
function createToken(dto) {
    const { exp: expiresIn, ...payload } = dto;

    return sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn },
    );
}

module.exports = createToken;