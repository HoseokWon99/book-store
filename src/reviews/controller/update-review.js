const { updateReview } = require("../service");
const { pipeline, validationHandler, params, body } = require("../../common");
const schema = require("../schema/update-review");
const StatusCodes = require("http-status-codes");

const updateReviewHandler = async (req, res) => {
    const id = Number(req.params.reviewId);
    const userId = req.user.id;
    const { content } = req.body;
    const data = await updateReview({ id, userId, content });
    res.status(StatusCodes.RESET_CONTENT).send(data);
}

module.exports = pipeline(
    validationHandler([params(schema.params), body(schema.body)]),
    updateReviewHandler
);