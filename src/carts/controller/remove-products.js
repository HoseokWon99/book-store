const { removeProducts } = require("../service");
const { pipeline, validateHandler, body } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/remove-products");

const removeProductsHandler = async (req, res) => {
    const userId = req.user.id;
    const { productsIds } = req.body;
    await removeProducts({ userId, productsIds });
    res.sendStatus(205);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validateHandler([body(schema)]),
    removeProductsHandler
);