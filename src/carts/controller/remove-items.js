const {  removeItems } = require("../service");
const { pipeline, validationHandler, body } = require("../../common");
const AuthGuard = require('../../auth/guard');
const schema = require("../schema/remove-items");

const removeProductsHandler = async (req, res) => {
    const userId = req.user.id;
    const { itemIds } = req.body;
    await removeItems({ userId, itemIds });
    res.sendStatus(205);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    validationHandler([body(schema)]),
    removeProductsHandler
);