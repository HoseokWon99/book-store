const { Book } = require("./book");
const { BookLike } = require("./book.like");
const { BookFan } = require("./book.fan");

Book.hasOne(BookLike, { foreignKey: "bookId", as: "reputation" });
BookLike.belongsTo(Book, { foreignKey: "bookId", targetKey: "id" });

module.exports = { Book, BookLike, BookFan };