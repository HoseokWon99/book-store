const { pipeline, validationHandler, params } = require("../common");
const { getCategoryValue } = require("./service");
const schema = require("./schema/get-category");
const StatusCodes = require("http-status-codes");

const getCategoryHandler = async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    const category = await getCategoryValue(categoryId);
    res.status(StatusCodes.OK).send({ category });
};

exports.getCategory = pipeline(
    validationHandler([params(schema)]),
    getCategoryHandler
);