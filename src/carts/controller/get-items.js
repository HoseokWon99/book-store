const { getItems } = require("../service");
const { pipeline, validationHandler, query, queryParser } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/get-items");

const parseQuery = queryParser(schema);

const getItemsHandler = async (req, res) => {
    const cartId = Number(req.params.cartId);
    const itemIds = req.query && parseQuery(req.query).itemIds;
    const products = await getItems({ cartId, itemIds });
    res.status(200).send({ products });
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validationHandler([query(schema)]),
    getItemsHandler
);