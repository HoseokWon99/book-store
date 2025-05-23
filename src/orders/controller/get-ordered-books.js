const { getOrderedBooks } = require("../service");
const { pipeline } = require("../../common");
const AuthGuard = require("../../auth/guard");
const StatusCodes = require("http-status-codes");

const getOrderedBooksHandler = async (req, res) => {
  const orderId = Number(req.params.orderId);
  const results = await getOrderedBooks(orderId);
  res.status(StatusCodes.OK).send({ results });
};

module.exports = pipeline(
    ...AuthGuard(["USER", "ADMIN"]),
    getOrderedBooksHandler
);