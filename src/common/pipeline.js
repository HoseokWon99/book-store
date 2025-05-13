

/**
 *
 * @param {...import("./typedef").Handler} handlers
 * @returns {import("./typedef").Pipeline}
 */
function pipeline(...handlers) {
    return handlers.map(
        handler => (async function(req, res, next) {
            try {
               await handler(req, res, next);
            }
            catch (error) {
                next(error);
            }
        })
    );
}

module.exports = { pipeline }