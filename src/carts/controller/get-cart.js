const { getCart } = require("../service");
const { pipeline } = require("../../common");
const StatusCodes = require("http-status-codes");

const getCartHandler = async (req, res) => {
  const data = await getCart(req.user.id);
  res.status(StatusCodes.OK).send(data);
};

module.exports = pipeline(getCartHandler);