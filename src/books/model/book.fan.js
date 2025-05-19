const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/sequelize");

class BookFan extends Model {}

BookFan.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookId: { type: DataTypes.BIGINT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    tableName: "books_fans",
    underscored: true
});

module.exports = { BookFan };