const { getCart } = require("../service");
const { pipeline } = require("../../common");
const AuthGuard = require('../../auth/guard');

const getCartHandler = async (req, res) => {
  const data = await getCart(req.user.id);
  res.status(200).send(data);
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    getCartHandler
)