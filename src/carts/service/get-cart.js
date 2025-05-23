const { Cart } = require('../model/cart');

/**
 * @typedef {{
 *     id: number;
 *     nItems: number;
 * }} CartDTO
 */

/**
 *
 * @param userId
 * @returns {Promise<CartDTO>}
 */
async function getCart(userId) {
    const { id, nItems } = await Cart.findByUserId(userId);
    return { id, nItems };
}

module.exports = getCart;