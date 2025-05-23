const { Order, OrderedBook } = require("../model");
const cartsService = require("../../carts/service");
const sequelize = require("../../config/sequelize");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{
 *     userId: number;
 *     itemIds: number[];
 *     paidPrice: number;
 *     address: string;
 *     recipient: string;
 *     tel: string;
 * }} CreateOrderDTO
 *
 * @typedef {{
 *     id: number;
 *     orderedOn: string;
 *     totalPrice: number;
 *     description: string;
 * }} CreateOrderResult
 */

/**
 *
 * @param {CreateOrderDTO} dto
 * @returns {Promise<CreateOrderResult>}
 */
async function createOrder(dto) {

    const {
        userId, itemIds, paidPrice,
        address, recipient, tel
    } = dto;

    return await sequelize.transaction(
        { autocommit: true },
        async transaction => {

            const items = await cartsService
                .orderItems({ userId, itemIds }, transaction);

            if (items.length !== itemIds.length)
                throw httpError(StatusCodes.BAD_REQUEST);

            const description = items.length > 1
                ? `${items[0].book.title} 외 ${items.length - 1} 종`
                : items[0].book.title;

            const { totalQuantity, totalPrice } = items.reduce(
                (acc, curr) => {
                    const { quantity, book: { price } } = curr;
                    acc.totalQuantity += quantity;
                    acc.totalPrice += quantity*price;
                    return acc;
                }, { totalQuantity: 0, totalPrice: 0 }
            );

            if (totalPrice !== paidPrice) throw httpError(StatusCodes.CONFLICT);

            const { id: orderId, orderedOn } = await Order.create({
                userId, address, recipient, tel,
                description, totalQuantity, totalPrice
            }, { transaction });

            const  { length: nCreated } =  await OrderedBook.bulkCreate(
                items.map(({ quantity, book: { bookId } }) => (
                    { orderId, bookId, quantity }
                )),
                { transaction }
            );

            if (nCreated !== items.length) throw httpError(StatusCodes.INTERNAL_SERVER_ERROR);

            return {
                id: orderId,
                orderedOn,
                description,
                totalPrice
            };
        }
    );
}

module.exports = createOrder;
