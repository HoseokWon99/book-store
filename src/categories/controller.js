const { pipeline, validationHandler, params } = require("../common");
const { getCategoryValue } = require("./service");
const schema = require("./schema/get-category");

const getCategoryHandler = async (req, res) => {
    const category = await getCategoryValue(Number(req.params.categoryId));
    res.status(200).send({ category });
};

exports.getCategory = pipeline(
    validationHandler([params(schema)]),
    getCategoryHandler
);