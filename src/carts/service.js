const { Product } = require('./products/model');
const { Book } = require("../books/model");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");
const httpError = require("http-errors");

/**
 *
 * @typedef {{
 *     id: bigint;
 *     title: string;
 *     abstract: string | null;
 *     price: number;
 *     nImages: number;
 *     imagesDirname: string | null;
 * }} BookInfo
 *
 * @typedef {
 *     Omit<BookInfo, "nImages" | "imagesDirname"> &
 *     { quantity: number; cover: string | null; }
 * } ProductDTO
 *
 * @typedef {{
 *     products: ProductDTO[];
 * }} CartDTO
 *
 * @typedef {{
 *     userId: number;
 *     bookId: bigint;
 *     deltaQuantity: number;
 * }} UpdateCartDTO
 *
 * @typedef {{
 * userId: number;
 * bookIds: bigint[];
 * }} RemoveProductsDTO
 *
 */

/**
 *
 * @param {number} userId
 * @returns {Promise<CartDTO>}
 */
async function getCart(userId) {
    return await Product.findAll({
        where: { userId },
        include: [{
            model: Book,
            as: "book",
            attributes: ["id", "title", "abstract", "price", "nImages", "imagesDirname"]
        }],
        attributes: { include: ["quantity"] }
    }).then(products => products.map(p => {
        const { quantity, book } = p.dataValues;
        const { nImages, imagesDirname, ...rest } = book;

        const cover = nImages && imagesDirname
            ? `${imagesDirname}/${0}.png` : null;

        return {
            quantity,
            ...rest,
            cover
        };
    })).then(products => ({ products }));
}

/**
 *
 * @param {UpdateCartDTO} dto
 * @returns {Promise<number>}
 */
async function updateCart(dto) {
    const { deltaQuantity, ...where} = dto;

    const product = await Product.findOrCreate({ where })
        .then(result => result[0]);

    if (product.dataValues.quantity + deltaQuantity < 0)
        throw httpError(408);

    await product.increment("quantity", { by: deltaQuantity });
    return product.dataValues.quantity;
}

/**
 *
 * @param {RemoveProductsDTO} dto
 * @returns {Promise<void>}
 */
async function removeProducts(dto) {
    const { userId, bookIds } = dto;
    const transaction = await sequelize.transaction();

    try {
        const nRemoved = await Product.destroy({
            where: { userId, bookId: { [Op.in]: bookIds } },
            transaction
        });

        if (nRemoved === bookIds.length) {
            await transaction.commit();
            return;
        }

        await transaction.rollback();
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }

    throw httpError(404);
}

module.exports = { getCart, updateCart, removeProducts };