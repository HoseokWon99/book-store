const { HttpError } = require("http-errors");

/**
 * @type {import("./typedef").ErrorHandler}
 */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.status ? err.status : 500;
    res.sendStatus(status);
};

module.exports = { errorHandler };