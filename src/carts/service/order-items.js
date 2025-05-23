const { Cart, CartItem } = require("../model");
const { Op} = require("sequelize");
const { Book } = require("../../books/model");

/**
 * @typedef {{
 *     userId: number;
 *     itemIds: number[];
 * }} OrderItemsDTO
 *
 * @typedef {{
 *     quantity: number;
 *     book: { id: bigint; title: string; price: number };
 * }} ItemDTO
 *
 */

/**
 *
 * @param {OrderItemsDTO} dto
 * @param {import("sequelize").Transaction | undefined} [transaction=undefined]
 * @returns {Promise<ItemDTO[]>}
 */
async function orderItems(dto, transaction = undefined) {
    const { userId, itemIds} = dto;

    const cart = await Cart.findByUserId(userId, {
        include: [{
            model: CartItem,
            as: "items",
            where: { id: { [Op.in]: itemIds }},
            attributes: { include: ["id", "quantity"] },
            include: [{
                model: Book,
                as: "book",
                attributes: { include: ["id", "title", "price"] },
            }]
        }],
        transaction
    });

   const data = await Promise.all(
       cart.items.map(async item => {
           const { quantity, book } = item;
           const { id, title, price } = book;
           await item.destroy({ transaction });
           return { quantity, book: { id, title, price } };
       })
   );

   await cart.decrement("nItems", { by: data.length, transaction });
   return data;
}

module.exports = orderItems;