const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/sequelize");
const { Book } = require("../../books/model");

class Product extends Model {}

Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
    sequelize,
    tableName: "carts_products",
    underscored: true
});

Book.hasMany(Product);
Product.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { Product };