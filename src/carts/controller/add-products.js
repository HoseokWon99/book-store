const { addProducts } = require("../service");
const { pipeline, validateHandler, body } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/add-products");

const addProductsHandler = async (req, res) => {
    const userId = req.user.id;
    const { products } = req.body;
    await addProducts({ userId, products });
    res.sendStatus(201);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validateHandler([body(schema)]),
    addProductsHandler
);