const { verify } = require("jsonwebtoken");
const Joi = require("joi");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

const schema = Joi.object().keys({
    id: Joi.number().integer().min(1).required(),
    email: Joi.string().email().required(),
    iat: Joi.number(),
    exp: Joi.number()
});

/**
 * @typedef {{
 * id: number;
 * email: string;
 * iat: number | undefined;
 * exp: number | undefined;
 * }} TokenPayload
 */

/**
 *
 * @param {string} token
 * @returns {TokenPayload}
 * @throws {import("http-errors").HttpError}
 */
function verifyToken(token) {
    const payload = __verify(token);
    console.log(typeof payload);
    console.log(payload);
    const { error } = schema.validate(payload);
    if (error) throw httpError(StatusCodes.UNAUTHORIZED);
    return payload;
}

/**
 *
 * @param {string} token
 * @returns {*}
 * @throws {import("http-errors").HttpError}
 * @private
 */
function __verify(token) {
    try {
        return verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        console.error(e);
        throw httpError(StatusCodes.UNAUTHORIZED);
    }
}

module.exports = verifyToken;