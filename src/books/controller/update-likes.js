const { updateLikes } = require("../service");
const { validationHandler, params, pipeline } = require("../../common");
const schema = require("../schema/get-book");
const StatusCodes = require("http-status-codes");

const updateLikesHandler = async (req, res) => {
    const bookId = BigInt(req.params.bookId);
    const userId = req.user.id;
    const data = await updateLikes({ bookId, userId });
    res.status(StatusCodes.RESET_CONTENT).send(data);
};

module.exports = pipeline(
    validationHandler([params(schema)]),
    updateLikesHandler
);