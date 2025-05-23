const { Product } = require("../model");

/**
 * @typedef{
 *      ({ cartId: number; } | { orderId: number;  }) &
 *      { products: Array<{ bookId: bigint; quantity: number; }> }
 * } CreateProductsDTO
 */

/**
 *
 * @param {CreateProductsDTO} dto
 * @param {import("sequelize").Transaction | undefined} [transaction=undefined]
 * @returns {Promise<number>}
 */
async function createProducts(
    dto,
    transaction = undefined
) {
    const { products, ...ids } = dto;
    let nCreated = 0;

    for (const { bookId, quantity } of products) {

        const [, created] = await Product.findOrCreate({
            where: { ...ids, bookId },
            defaults: { ...ids, bookId, quantity },
            transaction
        });

        created && ++nCreated;
    }

    return nCreated;
}

module.exports = createProducts;