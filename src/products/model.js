const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");
const { Book } = require("../books/model");

class Product extends Model {}

Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    belongsTo: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
    sequelize,
    tableName: "products",
    underscored: true
});

Book.hasMany(Product);
Product.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { Product };