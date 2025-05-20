const { Cart } = require("../model");
const { Product } = require("../../products/model");
const { Op } = require("sequelize");
const sequelize = require("../../config/sequelize");

/**
 * @typedef {{
 * userId: number;
 * productsIds: number[];
 * }} RemoveProductsDTO
 */

/**
 *
 * @param {RemoveProductsDTO} dto
 * @returns {Promise<void>}
 */
async function removeProducts(dto) {
    const { userId, productsIds } = dto;
    const cart = await Cart.findByUserId(userId);

    await sequelize.transaction(
        { autocommit: true },
        async transaction => {

            const nDeleted = await Product.destroy({
                where: {
                    id: { [Op.in]: productsIds },
                    cartId: cart.id
                },
                transaction
            });

            await cart.decrement("nProducts", { by: nDeleted, transaction });
        }
    );
}

module.exports = removeProducts;