const { getCart } = require("../service");
const { pipeline } = require("../../common");

const getCartHandler = async (req, res) => {
  const data = await getCart(req.user.id);
  res.status(200).send(data);
};

module.exports = pipeline(getCartHandler);