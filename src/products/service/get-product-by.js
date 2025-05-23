const { Product } = require("../model");
const httpError = require("http-errors");

/**
 * @typedef {{
 *     id: number;
 *     quantity: number;
 *     book: { id: bigint; coverImage: string; title: string; price: number; };
 * }} ProductDTO
 *
 * @typedef {
 *     { id: number; } &
 *     Partial<{ cartId: number; orderId: number; bookId: bigint; }>
 * } GetProductDTO
 */

/**
 *
 * @param {GetProductDTO} dto
 * @returns {Promise<ProductDTO>}
 */
async function getProductBy(dto) {

    const product = await Product.findProduct({
        where: dto,
        attributes: { include: ["id", "quantity"] }
    });

    if (!product) throw httpError(404);
    return product.get({ plain: true });
}

module.exports = getProductBy;