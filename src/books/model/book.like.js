const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/sequelize");

class BookLike extends Model {}

BookLike.init({
    bookId: { type: DataTypes.BIGINT, primaryKey: true },
    likes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
    sequelize,
    tableName: 'books_likes',
    underscored: true
});

module.exports = { BookLike };