//@ts-check
const { Book, BookLike } = require("../model");
const { literal } = require("sequelize");
const httpError = require("http-errors");

/**
 * @typedef {{ bookId: bigint } & Partial<{ userId: number; }>} GetBookDTO
 *
 * @typedef {{
 *     id: bigint;
 *     isbn: string;
 *     categoryId: number;
 *     title: string;
 *     author: string;
 *     pubOn: string | Date;
 *     price: number;
 *     pages: number | null;
 *     images: { cover: string | null; details: string[]; }
 *     descriptions: { abstract: string | null; detail: string | null; }
 *     reputation: { likes: number; likeIt: boolean | null; }
 * }} GetBookResult
 */


/**
 *
 * @param {GetBookDTO} dto
 * @returns {Promise<GetBookResult>}
 */
async function getBookBy(dto) {
    const { bookId, userId } = dto;

    const book = await Book.findByPk(bookId, __makeFindByPkOptions(userId));
    if (!book) throw httpError(404);

    const {
        id, isbn, categoryId,
        title, author, pubOn, price,
        pages, images, descriptions,
        reputation
    } = book;

    return {
        id, isbn, categoryId,
        title, author, pubOn, price,
        pages, images, descriptions,
        reputation
    };
}

/**
 *
 * @param {number | undefined} userId
 * @returns {*}
 * @private
 */
function __makeFindByPkOptions(userId) {

    const options = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{
            model: BookLike,
            as: "reputation",
            attributes: { include: ["likes"] },
            required: true
        }]
    };

    if (userId) {
        options.include[0].attributes.include.push([
            literal(`(EXISTS(SELECT 1 FROM books_fans WHERE books_fans.book_id = Book.id AND user_id = ${userId}))`),
            "likeIt"
        ]);
    }

    return options;
}

module.exports = getBookBy;