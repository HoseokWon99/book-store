const { Product } = require("../../products/model");
const { Order } = require("../model/order");
const { Op } = require('sequelize');
const sequelize = require("../../config/sequelize");
const httpError = require("http-errors");
const { Book } = require("../../books/model");

/**
 * @typedef {{
 *     productsIds: number[];
 *     userId: number;
 *     paidPrice: number;
 *     address: string;
 *     recipient: string;
 *     tel: string;
 * }} CreateOrderDTO
 *
 * @typedef {{
 *     id: number;
 *     address: string;
 *     recipient: string;
 *     tel: string;
 *     totalPrice: number;
 *     orderedOn;
 *     description: string;
 * }}
 */

/**
 *
 * @param {CreateOrderDTO} dto
 * @returns {Promise<void>}
 */
async function createOrder(dto) {

    const {
        productsIds,userId, paidPrice,
        address, recipient, tel
    } = dto;

   const products = await __findAndValidateProducts({
       productsIds, userId, paidPrice
   });

   const order = await sequelize.transaction(
        { autocommit: true },
        async transaction => {

            const order = await Order.create({
                userId, address, recipient,
                tel, paidPrice
            }, { transaction });

            for (const product of products) {
                await product.update(
                    { userId: null, orderId: order.id },
                    { transaction }
                );
            }

            return order;
        }
    );

    await order.reload();

}

/**
 *
 * @param {Pick<CreateOrderDTO, "productsIds" | "userId" | "paidPrice">} dto
 * @returns {Promise<Product[]>}
 * @private
 */
async function __findAndValidateProducts(dto) {
    const { productsIds, userId, paidPrice } = dto;

    const products = await Product.findProducts({
        id: { [Op.in]: productsIds },
        userId
    });

    if (products.length !== productsIds.length) throw httpError(409);

    const totalPrice = products.reduce(
        (acc, curr) => {
            const { quantity, book: { price } } = curr;
            acc += quantity*price;
            return acc;
        }, 0
    );

    if (totalPrice !== paidPrice) throw httpError(409);
    return products;
}
