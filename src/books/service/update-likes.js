//@ts-check
const { BookLike, BookFan } = require("../model");
const sequelize = require("../../config/sequelize");
const httpError = require("http-errors");

/**
 * @typedef {{
 *     bookId: bigint;
 *     userId: number;
 * }} UpdateLikesDTO
 *
 * @typedef {{
 *     likes: number;
 *     likeIt: boolean;
 * }} UpdateLikesResult
 */

/**
 *
 * @param {UpdateLikesDTO}dto
 * @returns {Promise<UpdateLikesResult>}
 */
async function updateLikes(dto) {
    const bookLike = await BookLike.findByPk(dto.bookId);
    if (!bookLike) throw httpError(404);
    const bookFan = await BookFan.findOne({ where: dto });

    await sequelize.transaction(
        { autocommit: true },
        async transaction => {



            if (bookFan) {
                await bookFan.destroy({ transaction });
                await bookLike.decrement("likes", { transaction });
            }
            else {
                await BookFan.create(dto, { transaction });
                await bookLike.increment("likes", { transaction });
            }
        }
    );

    const tmp = bookLike.likes;
    await bookLike.reload();
    return { likes: bookLike.likes, likeIt: bookLike.likes > tmp };
}

module.exports = updateLikes;