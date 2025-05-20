const { Cart } = require("../model");
const { Product } = require("../../products/model");
const sequelize = require("../../config/sequelize");

/**
 * @typedef {{
 *     userId: number;
 *     products: Array<{ bookId: bigint; quantity: number; }>
 * }} AddProductsDTO
 */

/**
 *
 * @param {AddProductsDTO} dto
 * @returns {Promise<void>}
 */
async function addProducts(dto) {
    const { userId, products } = dto;
    const cart = await Cart.findByUserId(userId);

    await sequelize.transaction(
        { autocommit: true },
        async transaction => {
            let nCreated = 0;

            for (const { bookId, quantity } of products) {

                const [_, created] = await Product.findOrCreate({
                    where: { userId, bookId },
                    defaults: { userId, bookId, quantity },
                    transaction
                });

                created && ++nCreated;
            }

            await cart.increment("nProducts", { by: nCreated, transaction });
        }
    );
}

module.exports = addProducts;