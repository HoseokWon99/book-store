const { updateQuantity } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const schema = require("../schema/update-quantity");
const StatusCodes = require("http-status-codes");

const updateQuantityHandler = async (req, res) => {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;
    const data = await updateQuantity({ userId, itemId, quantity });
    res.status(StatusCodes.RESET_CONTENT).send(data);
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    updateQuantityHandler
);