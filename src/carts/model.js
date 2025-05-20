const { Model, DataTypes, Sequelize} = require("sequelize");
const { User } = require("../users/model");
const { Product } = require("../products/model");
const sequelize = require("../config/sequelize");

class Cart extends Model {}

Cart.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    nProducts: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    sequelize,
    tableName: "carts",
    underscored: true
});

User.hasOne(Cart);
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(Product);
Product.belongsTo(Product, { foreignKey: "cartId" });

/**
 *
 * @param {number} userId
 * @param {
 * Omit<import("sequelize").FindOptions<import("sequelize").Attributes<Cart>>, "where"> |
 * undefined} [options=undefined]
 * @returns {Promise<Cart>}
 */
Cart.findByUserId = async function (userId, options = undefined) {
    options = options || {};
    options.where = { userId };
    options.defaults = { userId };
    const cart = await Cart.findOne(options);
    return cart || await Cart.create({ userId });
}

module.exports = { Cart };