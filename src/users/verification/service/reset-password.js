//@ts-check
const { updateUserBy } = require("../../service");
const redis = require("../../../config/redis");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{
 *     token: string;
 *     password: string;
 * }} ResetPasswordDTO
 */

/**
 *
 * @param {ResetPasswordDTO} dto
 * @returns {Promise<void>}
 */
async function resetPassword(dto) {
    const { token, password } = dto;

    const id = Number(await redis.get(token));
    if (!id) throw httpError(StatusCodes.UNAUTHORIZED);

    await updateUserBy({ id, password });
}

module.exports = resetPassword;