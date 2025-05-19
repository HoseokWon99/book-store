const { getBookBy } = require("../service");
const authGuard = require("../../auth/guard");
const schema = require("../schema/get-book")
const { validationHandler, params, pipeline } = require("../../common");

const getBookHandler = async (req, res) => {
    const bookId = BigInt(req.params.bookId);
    const userId = req.user ? req.user.id : req.user;
    const book = await getBookBy({ bookId, userId });
    res.status(200).send(book);
};

module.exports = pipeline(
    ...authGuard(["NONE", "USER", "ADMIN"]),
    validationHandler([params(schema)]),
    getBookHandler
);