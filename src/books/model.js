const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");
const { Category } = require("./categories/model");

class Book extends Model {}

Book.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    isbn: { type: DataTypes.CHAR(17), allowNull: false, unique: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    pubOn: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    nImages: { type: DataTypes.INTEGER, defaultValue: 0 },
    imagesDirname: { type: DataTypes.CHAR(32) },
    abstract: { type: DataTypes.STRING },
    detail: { type: DataTypes.TEXT },
    pages: { type: DataTypes.INTEGER }
}, {
    sequelize,
    tableName: "books",
    timestamps: true,
    underscored: true
});

Category.hasMany(Book);
Book.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = { Book };