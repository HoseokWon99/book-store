//@ts-check
const { User } = require("../model");
const { encryptUser } = require("./internal");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {
 *     { id: number; } &
 *     Partial<{  password: string;  role: "USER" | "ADMIN"; }>
 * } UpdateUserDTO
 */

/**
 *
 * @param {UpdateUserDTO} dto
 * @returns {Promise<void>}
 */
async function updateUserBy(dto) {
    const { id, ...values } = encryptUser(dto);

    const user = await User.findByPk(id);
    if (!user) throw httpError(StatusCodes.UNAUTHORIZED);

    await user.update(values);
}

module.exports = updateUserBy;