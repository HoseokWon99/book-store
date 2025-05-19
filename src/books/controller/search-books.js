const { searchBooksBy } = require("../service");
const schema = require("../schema/search-books");
const { validationHandler, query, pipeline } = require("../../common");
const { isExists } = require("date-fns");
const httpError = require("http-errors");

const parseQueryHandler = async (req, res, next) => {
    const data = Object.assign({}, req.query);

    data.page  = Number(data.page);
    data.limit = Number(data.limit);

    if (data.categories) {
        data.categories = data.categories
            .split(',')
            .map(Number);
    }

    if (data.pubOn) {
        data.pubOn = data.pubOn
            .split(',')
            .map(s => {
                const year = parseInt(s.substring(0, 4));
                const month = parseInt(s.substring(4, 6));
                const day = parseInt(s.substring(6));

                if (!isExists(year, month, day)) throw httpError(422);
                return new Date(year, month, day);
            });
    }

    if (data.price) data.price = data.price.split(",").map(parseInt);
    if (data.likes) data.likes = data.likes.split(",").map(parseInt);

    if (data.sort) {
        const [by, order] = data.sort.split(',');
        data.sort = { by, order };
    }

    req.data = data;
    next();
}

const searchBooksHandler = async (req, res) => {
    res.status(200).send(await searchBooksBy(req.data));
}

module.exports = pipeline(
    validationHandler([query(schema)]),
    parseQueryHandler,
    searchBooksHandler
);

