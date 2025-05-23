const { Order } = require("../model");

/**
 *
 * @typedef {{
 *     id: number;
 *     orderedOn: string;
 *     description: string;
 *     totalQuantity: number;
 *     totalPrice: number;
 *     address: string;
 *     recipient: string;
 *     tel: string;
 * }} OrderDTO
 */

/**
 *
 * @param {number} userId
 * @returns {Promise<OrderDTO[]>}
 */
async function getOrders(userId) {
    const orders = await Order.findAll({ where: { userId } });

    return orders.map(order => ({
        id: order.id,
        orderedOn: order.orderedOn,
        description: order.description,
        totalQuantity: order.totalQuantity,
        totalPrice: order.totalPrice,
        address: order.address,
        recipient: order.recipient,
        tel: order.tel
    }));
}

module.exports = getOrders;