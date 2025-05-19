const cartsService = require("./service");
const authGuard = require("../auth/guard");
const { pipeline, validationHandler, body, query } = require("../common");

const getCartHandler = async (req, res) => {
    const userId = req.user.id;
    const cart = await cartsService.getCart(userId);
    res.status(200).send(cart);
};

exports.getCart = pipeline(
    ...authGuard(["USER", "ADMIN"]),
    getCartHandler
);

const updateCartHandler = async (req, res) => {
    req.body.bookId = BigInt(req.body.bookId);

    const quantity = await cartsService.updateCart({
        userId: req.user.id,
        ...req.body
    });

    res.status(205).send({ quantity });
};

exports.updateCart = pipeline(
    ...authGuard(["USER", "ADMIN"]),
    validationHandler([body(require("./schema/update-cart"))]),
    updateCartHandler
);

const removeProductsHandler = async (req, res) => {
  const userId = req.user.id;
  const bookIds = req.query.bookIds.split(',').map(bookId => BigInt(bookId));
};

exports.removeProducts = pipeline(
    ...authGuard(["USER", "ADMIN"]),
    validationHandler([query(require("./schema/remove-products"))]),
    removeProductsHandler
);


