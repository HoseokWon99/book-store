const usersService = require("../../users/service");
const { createToken } = require("../../config/jwt");

/**
 * @typedef {{ email: string; password: string; }} SignInDTO
 * @typedef {{ accessToken: string, refreshToken: string }} TokenPair
 */

/**
 *
 * @param {SignInDTO} dto
 * @returns {Promise<TokenPair>}
 */
async function signIn(dto) {
    const user = await usersService.getUserBy(dto);

    const accessToken = createToken({
        ...user,
        exp: Number(process.env.JWT_ACCESS_TOKEN_DURATION)
    });

    const refreshToken = createToken({
        ...user,
        exp: Number(process.env.JWT_REFRESH_TOKEN_DURATION)
    });

    return { accessToken, refreshToken };
}

module.exports = signIn;