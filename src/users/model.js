const  { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER"
    }
}, {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: true
});

module.exports = { User };