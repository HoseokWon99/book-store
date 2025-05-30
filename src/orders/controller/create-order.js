const { createOrder } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const schema = require("../schema/create-order");
const StatusCodes = require("http-status-codes");

const createOrderHandler = async (req, res) => {
    const userId = req.user.id;
    const { itemIds, paidPrice, address, recipient, tel } = req.body;

    const data = await createOrder({
        userId, itemIds, paidPrice, address, recipient, tel
    });

    res.status(StatusCodes.CREATED).send(data);
};

module.exports = pipeline(
    validationHandler([body(schema)]),
    createOrderHandler
);