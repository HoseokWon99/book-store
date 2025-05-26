const { deleteReview } = require("../service");
const { pipeline, validationHandler, params } = require("../../common");
const schema = require("../schema/update-review").params;
const StatusCodes = require("http-status-codes");

const deleteReviewHandler = async (req, res) => {
    const id = Number(req.params.reviewId);
    const userId = req.user.id;
    await deleteReview({ id, userId });
    res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = pipeline(
    validationHandler([params(schema)]),
    deleteReviewHandler
);