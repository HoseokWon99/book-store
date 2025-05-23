// @ts-check
const { Book, BookLike } = require("../model");
const { literal, Op} = require("sequelize");

/**
 * @typedef {{
 *     currentPage: number | undefined;
 *     deltaPage: number;
 *     boundaryId
 *  }} PageOptions
 *
 * @typedef {{ by: "pubOn" | "price" | "likes"; order: "ASC" | "DESC" }} SortOptions
 *
 * @typedef {{
 *     id: bigint;
 *     title: string;
 *     author: string;
 *     price: number;
 *     likes: numberl
 *     cover: string | null;
 *     abstract: string | null;
 * }} BookSummaryDTO
 *
 * @typedef{Partial<{
 * keyword: string;
 * categories: number[];
 * pubOn: [Date, Date] | [string, string];
 * price: [number, number];
 * likes: [number, number];
 * sort: SortOptions
 * }> & {
 *     page: number;
 *     limit: number;
 * }} SearchBooksDTO
 *
 *@typedef {{
 *     total: number;
 *     results: BookSummaryDTO[];
 *}} SearchBooksResult
 */

/**
 *
 * @param {SearchBooksDTO} dto
 * @returns {SearchBooksResult}
 */
async function searchBooksBy(dto) {

    const options = __makeFindAllOptions(dto);

    const { rows: books, count: total }
        = await Book.findAndCountAll(options);

    const results = books.map(book => {
        const { id, title, author, price, abstract, coverImage: cover, reputation } = book;
        const likes = reputation.likes;
        return { id, title, author, price, abstract, cover, likes };
    });

    return { results, total };
}

/**
 *
 * @param {SearchBooksDTO} dto
 * @returns {*}
 * @private
 */
function __makeFindAllOptions(dto) {
    const { page, limit, sort, ...rest } = dto;
    const { likes, ...where } = rest;

    const offset = (page - 1) * limit;
    console.debug({ page: typeof page, limit: typeof limit })
    console.debug(offset);

    const order = sort
        ? [[sort.by === "likes" ? literal("likes") : sort.by, sort.order]]
        : sort;

    const include = [{
        model: BookLike,
        as: "reputation",
        required: true,
        attributes: { include: ["likes"] },
        where: likes ? { likes: { [Op.between]: likes } } : likes
    }];

    return {
        order, include, offset, limit,
        where: __makeWhereOptions(where),
        attributes: {
            include: ["id", "title", "author", "price", "coverImage", "abstract"]
        }
    };
}

/**
 *
 * @param {Omit<SearchBooksDTO, "page" | "limit" | "sort">} dto
 * @returns {*}
 * @private
 */
function __makeWhereOptions(dto) {
    const where = {};

    if (dto.keyword) {
        where[Op.or] = ["title", "author", "abstract"]
            .map(field => ({
                [field]: { [Op.regexp]: dto.keyword }
            }));
    }

    if (dto.categories) where.categoryId = { [Op.in]: dto.categories };
    if (dto.pubOn) where.pubOn = { [Op.between]: dto.pubOn };
    if (dto.price) where.price = { [Op.between]: dto.price };
    console.log(dto.categories);

    return where;
}

module.exports = searchBooksBy;