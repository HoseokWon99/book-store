const { DataTypes, Model } = require("sequelize");
const { Category } = require("../../categories/model");
const sequelize = require("../../config/sequelize");

class Book extends Model {}

Book.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    isbn: { type: DataTypes.CHAR(17), allowNull: false, unique: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    pubOn: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    coverImage: { type: DataTypes.STRING },
    detailImages: { type: DataTypes.TEXT },
    abstract: { type: DataTypes.STRING },
    detail: { type: DataTypes.TEXT },
    pages: { type: DataTypes.INTEGER },

    descriptions: {
        type: DataTypes.VIRTUAL,
        /**@returns{{ abstract: string : null; detail: string | null; }} */
        get() {
            return { abstract: this.abstract, detail: this.detail };
        }
    },
    images: {
        type: DataTypes.VIRTUAL,
        /** @returns {{ cover: string | null; details: string[] }}*/
        get() {
            return {
                cover: this.coverImage,
                details: this.detailImages ? this.detailImages.split(',') : []
            };
        }
    }
}, {
    sequelize,
    tableName: "books",
    timestamps: true,
    underscored: true
});

Category.hasMany(Book);
Book.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });

module.exports = { Book };