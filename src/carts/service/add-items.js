const { Cart, CartItem } = require("../model");
const sequelize = require("../../config/sequelize");

/**
 * @typedef {{
 *     userId: number;
 *     items: Array<{ bookId: bigint; quantity: number; }>
 * }} AddItemsDTO
 */

/**
 *
 * @param {AddItemsDTO} dto
 * @returns {Promise<void>}
 */
async function addItems(dto) {
    const { userId, items } = dto;
    const cart = await Cart.findByUserId(userId);
    const { id: cartId } = cart;

    await sequelize.transaction(
        { autocommit: true },
        async transaction => {
            let nCreated = 0;

            for (const { bookId, quantity } of items) {

                const [_, created] = await CartItem.findOrCreate({
                    where: { cartId, bookId },
                    defaults: { cartId, bookId, quantity },
                    transaction
                });

                created && ++nCreated;
            }

            await cart.increment("nItems", { by: nCreated, transaction });
        }
    );
}

module.exports = addItems;