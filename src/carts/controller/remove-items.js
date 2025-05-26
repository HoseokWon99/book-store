const {  removeItems } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const schema = require("../schema/remove-items");
const StatusCodes = require("http-status-codes");

const removeProductsHandler = async (req, res) => {
    const userId = req.user.id;
    const { itemIds } = req.body;
    await removeItems({ userId, itemIds });
    res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    removeProductsHandler
);