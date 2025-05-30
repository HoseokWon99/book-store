const { getOrders } = require("../service");
const { pipeline } = require("../../common");
const StatusCodes = require("http-status-codes");

const getOrderHandler = async (req, res) => {
  const userId = req.user.id;
  const results = await getOrders(userId);
  res.status(StatusCodes.OK).send({ results });
};

module.exports = pipeline(getOrderHandler);