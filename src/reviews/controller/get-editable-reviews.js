const { getReviewsBy } = require("../service");
const { pipeline } = require("../../common");
const AuthGuard = require('../../auth/guard');
const StatusCodes = require("http-status-codes");

const getEditableReviewsHandler = async (req, res) => {
    const userId = req.user.id;
    const results = await getReviewsBy({ userId });
    res.status(StatusCodes.OK).send({ results });
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    getEditableReviewsHandler
);