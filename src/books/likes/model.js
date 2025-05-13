const { Schema, model } = require('mongoose');

const likerSchema = new Schema({
    bookId: { type: Schema.Types.BigInt, required: true, unique: true, index: true },
    userId: { type: Number, required: true, unique: true, index: true }
}, { collection: "book_likers", timestamps: true });

const likeSchema = new Schema({
    bookId: { type: Schema.Types.BigInt, required: true, unique: true, index: true },
    count: { type: Number, default: 0, required: true },
}, { collection: "books_likes", timestamps: true });

const schema = new Schema({
    bookId: { type: Schema.Types.BigInt, required: true, unique: true, index: true },
    users: { type: Schema.Types.Map, of: String, default: {} },
    count: { type: Number, default: 0, required: true }
}, { collection: "books_likes" });

const BookLike = model("BookLike", schema);
module.exports = { BookLike };