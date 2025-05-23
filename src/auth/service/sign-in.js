const usersService = require("../../users/service");
const { createToken, verifyToken } = require("../../config/jwt");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{ email: string; password: string; }} SignInDTO
 * @typedef {{ accessToken: string, refreshToken: string }} TokenPair
 */

const ACCESS_EXPIRES =  Number(process.env.JWT_ACCESS_TOKEN_DURATION);
const REFRESH_EXPIRES = Number(process.env.JWT_REFRESH_TOKEN_DURATION);

/**
 *
 * @param {SignInDTO} dto
 * @returns {Promise<TokenPair>}
 */
async function signIn(dto) {
    const { email } = await usersService.getUserBy(dto);
    const accessToken = createToken(email, ACCESS_EXPIRES);
    const refreshToken = createToken(email, REFRESH_EXPIRES);
    return { accessToken, refreshToken };
}