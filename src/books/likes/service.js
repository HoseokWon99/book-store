const { BookLike } = require("./model");
const httpError = require("http-errors");

/**
 *
 * @typedef {{ bookId: bigint; userId?: number; }} GetBookDTO
 * @typedef {{ bookId: bigint; userId: number; }} UpdateBookLikeDTO
 */

/**
 *
 * @param {bigint} bookId
 * @returns {Promise<void>}
 */
async function createBookLike(bookId) {
    if (!await BookLike.exists({ bookId }).exec())
        await BookLike.create({ bookId });
}

/**
 *
 * @param {GetBookDTO} dto
 * @returns {Promise<{ likes: number; likeIt: boolean | null }>}
 */
async function getBookLike(dto) {
    const doc = await BookLike.findOne({ bookId: dto.bookId }).exec();
    if (!doc) throw httpError(404);

    return {
        likes: doc.count,
        likeIt: typeof dto.userId ==='undefined'
            ? null
            : !!doc.users.get(dto.userId.toString())
    };
}

/**
 *
 * @param {UpdateBookLikeDTO} dto
 * @returns {Promise<number>}
 */
async function updateBookLike(dto) {
    const { bookId, userId } = dto;

    const doc = await BookLike.findOne({ bookId }).exec();
    if (!doc) throw httpError(404);

    try {
        const key = userId.toString();

        if (doc.users.get(key)) {
            doc.users.delete(key);
            doc.count -= 1;
        }
        else {
            doc.users.set(key, new Date().toLocaleDateString());
            doc.count += 1;
        }

        await doc.save();
        return doc.count;
    }
    catch (error) {
        throw error;
    }

}

module.exports = { createBookLike, updateBookLike, getBookLike };