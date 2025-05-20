const { getProducts } = require("../service");
const { pipeline, validateHandler, params } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/get-products");

const getProductsHandler = async (req, res) => {
    const cartId = Number(req.params.cartId);
    const products = await getProducts(cartId);
    res.status(200).send({ products });
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validateHandler([params(schema)]),
    getProductsHandler
);