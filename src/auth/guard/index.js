const jwtHandler = require("./passport");
const RoleHandler = require("./role");

/**
 *
 * @param {Array<"NONE" | "USER" | "ADMIN">} roles
 * @returns {import("../../common/typedef").Handler[]}
 */
module.exports = roles => [
    jwtHandler,
    RoleHandler(roles)
];