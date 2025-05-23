const { Product } = require("../model");
const httpError = require("http-errors");

/**
 * @typedef {
 *     { id: number; } &
 *     Partial<{
 *     cartId: number | null;
 *     orderId: number | null;
 *     quantity: number;
 *     }>
 * } UpdateProductDTO
 */

/**
 *
 * @param {UpdateProductDTO} dto
 * @param {import("sequelize").Transaction | undefined} [transaction=undefined]
 * @returns {Promise<void>}
 */
async function updateProductBy(
    dto,
    transaction = undefined
) {
    const { id, ...values } = dto;
    const product = await Product.findByPk(id, { transaction });
    if (!product) throw httpError(404);
    await product.update(values, { transaction });
}

module.exports = updateProductBy;