const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Category extends Model {}

Category.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, {
    sequelize,
    tableName: "categories",
    timestamps: false,
    underscored: true
});

module.exports = { Category };