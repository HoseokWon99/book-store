const { Product } = require('./model');
const { Book } = require("../books/model");
const httpError = require("http-errors");
const sequelize = require("../config/sequelize");
const { Op} = require("sequelize");

/**
 *
 * @typedef {{
 *     id: bigint;
 *     title: string;
 *     abstract: string | null;
 *     price: number;
 *     cover: string | null;
 * }} BookInfo
 *
 * @typedef {{
 * quantity: number;
 * bookInfo: BookInfo;
 * }} ProductDTO
 *
 *
 * @typedef {{
 *     belongsTo: string;
 *     bookId: bigint;
 *     deltaQuantity: number;
 * }} UpdateProductQuantityDTO
 *
 * @typedef {{
 * belongsTo: string;
 * bookIds: bigint[];
 * }} RemoveProductsDTO
 *
 * @typedef {{
 * userId: number;
 * orderId: number;
 * bookIds: bigint[];
 * }} MakeOrderDTO
 *
 * @typedef {{
 *
 * }}
 *
 */

/**
 *
 * @param {string} belongsTo
 * @returns {Promise<ProductDTO[]>}
 */
async function getProducts(belongsTo) {

    const products = await Product.findAll({
        where: { belongsTo },
        include: [{
            model: Book,
            as: "book",
            attributes: ["id", "title", "abstract", "price", "nImages", "imagesDirname"]
        }],
        attributes: { include: ["quantity"] }
    });

    return products.map(product => {
        const { quantity, book } = product;
        const { id, title, abstract, price, cover } = book.get();

        return {
            quantity,
            bookInfo: { id, title, abstract, price, cover }
        };
    });
}

/**
 *
 * @param {UpdateProductQuantityDTO} dto
 * @returns {Promise<number>}
 */
async function updateProductQuantity(dto) {
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
    const { belongsTo, bookIds } = dto;
    const transaction = await sequelize.transaction();

    try {
        const nRemoved = await Product.destroy({
            where: { belongsTo, bookId: { [Op.in]: bookIds } },
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

/**
 *
 * @param {MakeOrderDTO} dto
 * @returns {Promise<*>}
 */
async function makeOrder(dto) {
    const { userId, orderId, bookIds } = dto;
    const belongsTo = `order-${orderId}`;

    await Product.findOne({ where: { belongsTo } })
        .then(p => { if (p) throw httpError(408); });

    const transaction = await sequelize.transaction();

    try {

        const [cnt, affected] = await Product.update(
            { belongsTo }, {
            where: {
                belongsTo: `cart-${userId}`,
                bookId: { [Op.in]: bookIds }
            },
            transaction
        });

        if (cnt === bookIds.length) {
            await transaction.commit();
            return affected.map(p => {})
        }

        await transaction.rollback();
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }

    throw httpError(404);
}