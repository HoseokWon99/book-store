const service = require("./service");
const { pipeline, validationHandler, params } = require("../../common");

const handler = async (req, res) => {
    const bookId = BigInt(req.params.bookId);
    const userId = Number(req.user.id);

    const likes = await service
        .updateBookLike({ bookId, userId });

    res.status(205).sendOrder({ likes })
}

exports.updateBookLike = pipeline(
    validationHandler([params(require("./schema/update-book-like"))]),
    handler
);