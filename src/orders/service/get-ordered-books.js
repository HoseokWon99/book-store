const { OrderedBook } = require("../model");
const { Book } = require("../../books/model");

/**
 * @typedef {{
 *     quantity: number;
 *     book: { id: bigint; title: string; price: number; };
 * }} OrderedBookDTO
 */

/**
 *
 * @param {number} orderId
 * @returns {Promise<OrderedBookDTO[]>}
 */
async function getOrderedBooks(orderId) {

    const ordered = await OrderedBook.findAll({
        where: { orderId },
        attributes: ["bookId", "quantity"],
        include: [{
            model: Book,
            as: "book",
            attributes: { include: ["id", "title", "price"] }
        }]
    });

    return ordered.map(o => {
        const { quantity, book: { id, title, price } } = o;
        return { quantity, book: { id, title, price } };
    })
}

module.exports = getOrderedBooks;