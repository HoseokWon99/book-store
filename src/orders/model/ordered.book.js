const { Model, DataTypes } = require("sequelize");
const { Book } = require("../../books/model");
const sequelize = require("../../config/sequelize");

class OrderedBook extends Model {}

OrderedBook.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
}, {
    sequelize,
    tableName: "ordered_books",
    underscored: true
});

Book.hasMany(OrderedBook);
OrderedBook.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { OrderedBook };



