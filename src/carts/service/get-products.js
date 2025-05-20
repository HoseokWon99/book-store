const { Product } = require("../../products/model");
const { Book } = require("../../books/model");

/**
 * @typedef {{
 *     id: number;
 *     quantity: number;
 *     book: {  id: bigint; coverImage: string | null; title: string; price: number; }
 * }} ProductDTO
 *
 *
 *
 */

/**
 *
 * @param {number} cartId
 * @returns {Promise<ProductDTO[]>}
 */
async function getProducts(cartId) {

    const products = await Product.findAll({
        where: { cartId },
        attributes: { include: ["quantity"] },
        include: [{
            model: Book,
            as: "book",
            attributes: { include: ["id", "title", "price", "coverImage"] }
        }]
    });

    return products.map(product => {
        const { id, quantity, book } = product;
        return { id, quantity, book: book.get({ plain: true }) };
    });
}

module.exports = getProducts;