const { Cart } = require('../model');

/**
 * @typedef {{
 *     id: number;
 *     nProducts: number;
 * }} CartDTO
 */

/**
 *
 * @param userId
 * @returns {Promise<CartDTO>}
 */
async function getCart(userId) {
    const { id, nProducts } = await Cart.findByUserId(userId);
    return { id, nProducts };
}

module.exports = getCart;