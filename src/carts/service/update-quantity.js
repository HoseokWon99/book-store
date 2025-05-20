const { Product } = require("../../products/model");
const httpError = require("http-errors");
const {Cart} = require("../model");

/**
 *@typedef {{
 *     userId: number;
 *     productId: number;
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
    const { userId, productId, quantity } = dto;
    const cart = await Cart.findByUserId(userId);

    const product = await Product.findOne({
        where: { id: productId, cartId: cart.id }
    });

    if (!product) throw httpError(404);

    await product.update({ quantity });
    return { productId: product.id, quantity: product.quantity };
}

module.exports = updateQuantity;