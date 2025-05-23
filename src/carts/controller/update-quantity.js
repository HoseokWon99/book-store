const { updateQuantity } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/update-quantity");

const updateQuantityHandler = async (req, res) => {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;
    const data = await updateQuantity({ userId, itemId, quantity });
    res.status(205).send(data);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validationHandler([body(schema)]),
    updateQuantityHandler
);