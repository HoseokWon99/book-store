const { Product } = require("../model");
const { Op } = require('sequelize');

/**
 *
 * @param {number[]} productIds
 * @param {import("sequelize").Transaction | undefined} [transaction=undefined]
 * @returns {Promise<number>}
 */
async function removeProducts(
    productIds,
    transaction = undefined
) {
    return await Product.destroy({
        where: { id: { [Op.in]: productIds } },
        transaction
    });
}

module.exports = removeProducts;