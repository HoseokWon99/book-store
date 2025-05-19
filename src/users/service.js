//@ts-check
const { User } = require("./model");
const { createHash } = require("crypto");
const httpError = require("http-errors");
const eventEmitter = require("../config/event-emitter");

/**
 * @typedef {{
 *     id: number;
 *     email: string;
 *     password: string;
 *     role: "USER" | "ADMIN";
 *     createdAt: Date;
 *     updatedAt: Date;
 * }} UserDTO
 *
 * @typedef{Pick<UserDTO, "email" | "password">} CreateUserDTO
 *
 * @typedef {
 *      ({ id: number; } & Partial<Omit<UserDTO, "id">>) |
 *      ({ email: string } & Partial<Omit<UserDTO, "email">>)
 * } GetUserDTO
 *
 */

/**
 *
 * @async
 * @param {CreateUserDTO} dto
 * @returns {Promise<void>}
 */
async function createUser(dto) {
    const { email, password } = __encryptUser(dto);

    const [{ dataValues: user }, created]
        = await User.findOrCreate({
            where: { email }, defaults: { password }
        });

    if (!created) throw httpError(408);
    eventEmitter.emit("user.created", user);
}

/**
 *
 * @async
 * @param {GetUserDTO} dto
 * @returns {Promise<UserDTO>}
 */
async function getUserBy(dto) {

    const user = await User.findOne({
        where: __encryptUser(dto)
    });

    if (!user) throw httpError(404);
    return user.dataValues;
}

/**
 *
 * @param {Object} dto
 * @private
 */
function __encryptUser(dto) {

    if (dto.password && typeof dto.password === 'string') {

        dto.password = createHash("sha256")
            .update(dto.password)
            .digest("base64");

    }

    return dto;
}

module.exports = { createUser, getUserBy };