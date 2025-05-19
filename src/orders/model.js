const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Order extends Model {}

Order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    
})