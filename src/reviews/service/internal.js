const { Review } = require("../model");
const httpError = require("http-errors");
const StatusCodes = require("http-status-codes");

/**
 * @typedef {{
 *     id: number;
 *     writtenOn: string;
 *     content: string;
 *     editable: boolean;
 * }} ReviewDTO
 */

/**
 *
 * @param {Review} review
 * @param {number} [userId=0]
 */
function modelToDTO(review, userId = 0) {
    const { id, writtenOn, content } = review;
    const editable = review.userId === userId;
    return { id, writtenOn, content, editable };
}

/**
 *
 * @param {number} id
 * @param {number} userId
 * @returns {Review}
 */
async function loadReview(id, userId) {
    const review = await Review.findByPk(id);
    if (!review) throw httpError(StatusCodes.NOT_FOUND);
    if (review.userId !== userId) throw httpError(StatusCodes.FORBIDDEN);
    return review;
}

module.exports = { modelToDTO, loadReview };