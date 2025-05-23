const { addItems } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/add-items");

const addProductsHandler = async (req, res) => {
    const userId = req.user.id;
    const { items } = req.body;
    await addItems({ userId, items });
    res.sendStatus(201);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validationHandler([body(schema)]),
    addProductsHandler
);