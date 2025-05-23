const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { User } = require("../users/model");
const { Book } = require("../books/model");
const { format } = require("date-fns");

class Review extends Model {}

Review.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.BIGINT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    writtenOn: {
        type: DataTypes.VIRTUAL,
        get() { return format(this.createdAt, "yyyy.MM.dd"); }
    }
}, {
    sequelize,
    tableName: "reviews",
    underscored: true
});

User.hasMany(Review);
Review.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Review);
Review.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { Review };