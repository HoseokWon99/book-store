//@ts-check
const { User } = require("../model");
const { encryptUser } = require("./internal");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{
 *     id: number;
 *     email: string;
 *     password: string;
 * }} UserInfo
 *
 * @typedef {
 *      ({ id: number; } & Partial<Omit<UserInfo, "id">>) |
 *      ({ email: string } & Partial<Omit<UserInfo, "email">>)
 * } GetUserDTO
 *
 * @typedef {Omit<UserInfo, "password">} UserDTO
 */

/**
 *
 * @param {GetUserDTO} dto
 * @returns {Promise<UserDTO>}
 */
async function getUserBy(dto) {
    const where = encryptUser(dto);

    const user = await User.findOne({ where });
    if (!user) throw httpError(StatusCodes.UNAUTHORIZED);

    const { id, email } = user;
    return { id, email };
}

module.exports = getUserBy;