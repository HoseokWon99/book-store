const { createBooks } = require("../service");
const authGuard = require("../../auth/guard");
const schema = require("../schema/create-books");
const { validationHandler, body, pipeline } = require("../../common");

const createBooksHandler = async (req, res) => {
    await createBooks(req.body.items);
    res.sendStatus(201);
};

module.exports = pipeline(
    ...authGuard(["ADMIN"]),
    validationHandler([body(schema)]),
    createBooksHandler
);