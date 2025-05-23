const { CartItem } = require("../model");
const { Book } = require("../../books/model");
const { Op } = require("sequelize");

/**
 *
 * @typedef {
 * { cartId: number; } &
 * Partial<{itemIds: number[];}>
 *} GetItemsDTO
 *
 * @typedef {{
 *     id: number;
 *     quantity: number;
 *     book: {  id: bigint; coverImage: string | null; title: string; price: number; }
 * }} ItemDTO
 */

/**
 *
 * @param {GetItemsDTO} dto
 * @returns {Promise<ItemDTO[]>}
 */
async function getItems(dto) {
    const { cartId, itemIds } = dto;

    const where = { cartId };
    itemIds && ( where.id = { [Op.in]: itemIds } );

    const items = await CartItem.findAll({
        where,
        include: [{
            model: Book,
            as : "book",
            attributes: { include: ["id", "coverImage", "title", "price"] },
        }]
    });

    return items.map(item => {

       const {
           id: itemId, quantity,
           book: { bookId, coverImage, title, price }
       } = item;

       return {
           id: itemId, quantity,
           book: { id: bookId, coverImage, title, price }
       };
    });
}

module.exports = getItems;