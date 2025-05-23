//@ts-check
const { User } = require("../model");
const { encryptUser } = require("./internal");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{ id: number; password: string; }} UpdatePasswordDTO
 */

/**
 *
 * @param {UpdatePasswordDTO} dto
 * @returns {Promise<void>}
 */
async function updatePassword(dto) {
    const { id, password } = encryptUser(dto);

    const user = await User.findByPk(id);
    if (!user) throw httpError(StatusCodes.NOT_FOUND);

    await user.update({ password });
}

module.exports = updatePassword;