const { Model, DataTypes } = require("sequelize");
const { User } = require("../../users/model");
const { format } = require("date-fns");
const sequelize = require("../../config/sequelize");

class Order extends Model {}

Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 }
    },
    address: { type: DataTypes.STRING, allowNull: false },
    recipient: { type: DataTypes.STRING, allowNull: false },
    tel: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        validate: { is: /^(\d{3})(\d{3,4})(\d{4})$/i }
    },
    orderedOn: {
        type: DataTypes.VIRTUAL,
        get() { return format(this.createdAt, "yyyy.MM.dd"); }
    }
}, {
    sequelize,
    tableName: "orders",
    underscored: true
});

User.hasMany(Order);
Order.belongsTo(Order, { foreignKey: "userId" });

module.exports = { Order };