const { Model, DataTypes, Op} = require('sequelize');
const { Book } = require("../books/model");
const sequelize = require("../config/sequelize");

class Product extends Model {}

Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cartId: { type: DataTypes.INTEGER },
    orderId: { type: DataTypes.INTEGER },
    bookId: { type: DataTypes.BIGINT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }
}, {
    sequelize,
    tableName: "products",
    underscored: true
})

Book.hasMany(Product);
Product.belongsTo(Book, { foreignKey: "bookId" });

const __joinOptions = {
    model: Book,
    as: "book",
    attributes: { include: ["id", "coverImage", "title", "price"] }
};

/**
 * @typedef {
 *     import("sequelize").FindOptions<import("sequelize").Attributes<Product>>
 * } FindOptions
 */

/**
 *
 * @param {FindOptions} options
 * @returns {Promise<Product>}
 */
Product.findProduct = async function (options) {
    options.include instanceof Array || (options.include = []);
    options.include.push(__joinOptions);
    return await Product.findOne(options);
};

/**
 *
 * @param {FindOptions} options
 * @returns {Promise<Product[]>}
 */
Product.findProducts = async function (options) {
    options.include instanceof Array || (options.include = []);
    options.include.push(__joinOptions);
    return await Product.findAll(options);
};

module.exports = { Product };