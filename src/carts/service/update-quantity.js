const { Cart, CartItem } = require("../model");
const httpError = require("http-errors");

/**
 *@typedef {{
 *     userId: number;
 *     itemId: number;
 *     quantity: number;
 *}} UpdateQuantityDTO
 *
 * @typedef {Omit<UpdateQuantityDTO, "userId">} UpdateQuantityResult
 */

/**
 *
 * @param {UpdateQuantityDTO} dto
 * @returns {Promise<UpdateQuantityResult>}
 */
async function updateQuantity(dto) {
    const { userId, itemId, quantity } = dto;

    const { cartItems: items } = await Cart.findByUserId(userId, {
        include: [{
            model: CartItem,
            as: "cartItems",
            where: { id: itemId },
            limit: 1
        }]
    });

    if (!items.length) throw httpError(404);

    /** @type{CartItem} */
    const item = items[0];
    await item.update({ quantity });

    return  { itemId, quantity };
}

module.exports = updateQuantity;