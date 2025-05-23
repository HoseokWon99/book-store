//@ts-check
const { User } = require("../model");
const { encryptUser } = require("./internal");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{ email: string; password: string; }} CreateUserDTO
 */

/**
 *
 * @param {CreateUserDTO} dto
 * @returns {Promise<void>}
 */
async function createUser(dto) {
    const { email, password } = encryptUser(dto);

    const [, created] = await User.findOrCreate({
        where: { email }, defaults: { email, password }
    });

    if (!created) throw httpError(StatusCodes.CONFLICT);
}

module.exports = createUser;