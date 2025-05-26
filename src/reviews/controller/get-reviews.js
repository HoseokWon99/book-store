const { getReviewsBy } = require("../service");
const { pipeline, validationHandler, params } = require("../../common");
const schema = require("../schema/get-reviews");
const StatusCodes = require("http-status-codes");

const getReviewsHandler = async (req, res) => {
    const bookId = BigInt(req.params.bookId);
    const userId = req.user && req.user.id;
    const results = await getReviewsBy({ bookId, userId });
    res.status(StatusCodes.OK).send({ results });
}

module.exports = pipeline(
    validationHandler([params(schema)]),
    getReviewsHandler
);