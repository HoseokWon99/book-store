const { Model, DataTypes } = require("sequelize");
const { Book } = require("../../books/model");
const sequelize = require("../../config/sequelize");

class CartItem extends Model {}

CartItem.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cartId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
}, {
    sequelize,
    tableName: "carts_items",
    underscored: true
});

Book.hasMany(CartItem);
CartItem.belongsTo(Book, { foreignKey: "bookId", as: "book" });



module.exports = { CartItem };