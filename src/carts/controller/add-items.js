const { addItems } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const schema = require("../schema/add-items");
const StatusCodes = require("http-status-codes");

const addProductsHandler = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body;
    await addItems({ userId, items });
    res.sendStatus(StatusCodes.CREATED);
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    addProductsHandler
);