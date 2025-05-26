const { createBooks } = require("../service");
const { validationHandler, body, pipeline } = require("../../common");
const schema = require("../schema/create-books");
const StatusCodes = require("http-status-codes");

const createBooksHandler = async (req, res) => {
    await createBooks(req.body.items);
    res.sendStatus(StatusCodes.CREATED);
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    createBooksHandler
);