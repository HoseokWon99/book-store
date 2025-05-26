const { updateLikes } = require("../service");
const schema = require("../schema/get-book");
const { validationHandler, params, pipeline } = require("../../common");

const updateLikesHandler = async (req, res) => {
    const bookId = BigInt(req.params.bookId);
    const userId = req.user.id;
    const reputation = await updateLikes({ bookId, userId });
    res.status(200).send(reputation);
};

module.exports = pipeline(
    validationHandler([params(schema)]),
    updateLikesHandler
);