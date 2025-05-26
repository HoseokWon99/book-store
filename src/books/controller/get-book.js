const { getBookBy } = require("../service");
const { validationHandler, params, pipeline } = require("../../common");
const schema = require("../schema/get-book");
const StatusCodes = require("http-status-codes");

const getBookHandler = async (req, res) => {
    const bookId = BigInt(req.params.bookId);
    const userId = req.user && req.user.id;
    const book = await getBookBy({ bookId, userId });
    res.status(StatusCodes.OK).send(book);
};

module.exports = pipeline(
    validationHandler([params(schema)]),
    getBookHandler
);