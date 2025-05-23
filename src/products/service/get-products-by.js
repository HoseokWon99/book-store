const { Product } = require("../model");
const { Op } = require('sequelize');

/**
 * @typedef {Partial<{
 * cartId: number; orderId: number;  ids: number[]; bookIds: bigint[];
 * }>} GetProductsDTO
 */

/**
 *
 * @param {GetProductsDTO} dto
 * @returns {Promise<import("./get-product-by").ItemDTO[]>}
 */
async function getProductsBy(dto) {
    const { cartId, orderId, ids, bookIds } = dto;

    const products = await Product.findProducts({
        where: {
            cartId, orderId,
            id: ids && { [Op.in]: ids },
            bookId: bookIds && { [Op.in]: bookIds }
        },
        attributes: { include: ["id", "quantity"] }
    });

    return products.map(product => product.get({ plain: true }));
}

module.exports = getProductsBy;