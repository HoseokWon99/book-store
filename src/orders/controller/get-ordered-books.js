const { getOrderedBooks } = require("../service");
const { pipeline } = require("../../common");
const StatusCodes = require("http-status-codes");

const getOrderedBooksHandler = async (req, res) => {
  const orderId = Number(req.params.orderId);
  const results = await getOrderedBooks(orderId);
  res.status(StatusCodes.OK).send({ results });
};

module.exports = pipeline(getOrderedBooksHandler);