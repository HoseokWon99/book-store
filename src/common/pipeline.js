const authHandler = require("../config/auth-handler");

/**
 *
 * @param {...import("./typedef").Handler} handlers
 * @returns {import("./typedef").Pipeline}
 */
function pipeline(...handlers) {
    return [
        authHandler,
        ...handlers.map(__embraceWithTryCatch)
    ];
}

/**
 *
 * @param {import("./typedef").Handler} handler
 * @returns {import("./typedef").Handler}
 * @private
 */
function __embraceWithTryCatch(handler) {
    return async function(req, res, next) {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}

module.exports = { pipeline }