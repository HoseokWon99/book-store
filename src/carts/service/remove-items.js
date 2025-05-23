const { Cart, CartItem } = require("../model");
const { Op } = require("sequelize");
const sequelize = require("../../config/sequelize");

/**
 * @typedef {{ userId: number; itemIds: number[]; }} RemoveItemsDTO
 */

/**
 *
 * @param {RemoveItemsDTO} dto
 * @returns {Promise<void>}
 */
async function removeItems(dto) {
    const { userId, itemIds } = dto;
    const cart = await Cart.findByUserId(userId);

    await sequelize.transaction(
        { autocommit: true },
        async transaction => {

            const nDeleted = await CartItem.destroy({
                where: {
                    id: { [Op.in]: itemIds },
                    cartId: cart.id
                },
                transaction
            });

            await cart.decrement("nItems", { by: nDeleted, transaction });
        }
    );
}

module.exports = removeItems;