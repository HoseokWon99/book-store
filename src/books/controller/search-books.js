const { searchBooksBy } = require("../service");
const { pipeline, validationHandler, query, queryParser } = require("../../common");
const schema = require("../schema/search-books");
const parseQuery = queryParser(schema);

const searchBooksHandler = async (req, res) => {
    const data = parseQuery(req.query);

    Object.entries(data)
        .forEach(([key, value]) => {
            console.debug(`${key}: ${value} ${typeof value}`);
        })

    res.status(200).send(await searchBooksBy(data));
};

module.exports = pipeline(
    validationHandler([query(schema)]),
    searchBooksHandler
);

