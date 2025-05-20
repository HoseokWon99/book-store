const { Model, DataTypes } = require("sequelize");
const { Product } = require("../../products/model");
const { format } = require("date-fns");
const sequelize = require("../../config/sequelize");

class Order extends Model {}

Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    recipient: { type: DataTypes.STRING, allowNull: false },
    tel: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        validate: { is: /^(\d{3})(\d{3,4})(\d{4})$/i }
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "orders",
    underscored: true
})

Order.hasMany(Product);
Product.belongsTo(Order, { foreignKey: "orderId" });

module.exports = { Order };