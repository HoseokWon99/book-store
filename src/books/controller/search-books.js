const { searchBooksBy } = require("../service");
const { pipeline, validationHandler, query, queryParser } = require("../../common");
const schema = require("../schema/search-books");
const parseQuery = queryParser(schema);
const StatusCodes = require("http-status-codes");

const searchBooksHandler = async (req, res) => {
    const query = parseQuery(req.query);
    const data = await searchBooksBy(query);
    res.status(StatusCodes.OK).send(data);
};

module.exports = pipeline(
    validationHandler([query(schema)]),
    searchBooksHandler
);

