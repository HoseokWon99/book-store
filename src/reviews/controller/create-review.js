const { createReview } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const schema = require("../schema/create-review");
const StatusCodes = require("http-status-codes")

const createReviewHandler = async (req, res) => {
  const data = await createReview(req.body);
  res.status(StatusCodes.CREATED).send(data);
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    createReviewHandler
);