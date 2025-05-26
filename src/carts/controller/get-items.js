const { getItems } = require("../service");
const { pipeline, validationHandler, query, queryParser } = require("../../common");
const schema = require("../schema/get-items");
const StatusCodes = require("http-status-codes");

const parseQuery = queryParser(schema);

const getItemsHandler = async (req, res) => {
    const cartId = Number(req.params.cartId);
    const itemIds = req.query && parseQuery(req.query).itemIds;
    const products = await getItems({ cartId, itemIds });
    res.status(StatusCodes.OK).send({ products });
};

module.exports = pipeline(
    validationHandler([query(schema)]),
    getItemsHandler
);