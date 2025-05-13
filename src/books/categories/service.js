const { Category } = require("./model");
const httpError = require("http-errors");

/**
 *
 * @param {number} categoryId
 * @returns {Promise<string>}
 */
async function getCategoryValue(categoryId) {
    const cat = await Category.findByPk(categoryId);
    if (!cat) throw httpError(404);
    return cat.dataValues.value;
}

module.exports = { getCategoryValue }