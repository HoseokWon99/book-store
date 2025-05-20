const { updateQuantity } = require("../service");
const { pipeline, validateHandler, body } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/update-quantity");

const updateQuantityHandler = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const data = await updateQuantity({ userId, productId, quantity });
    res.status(205).send(data);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validateHandler([body(schema)]),
    updateQuantityHandler
);