const { loadReview } = require("./internal");

/**
 * @typedef {{ id: number; userId: number; }} DeleteReviewDTO
 */

/**
 *
 * @param {DeleteReviewDTO} dto
 * @returns {Promise<void>}
 */
async function deleteReview(dto) {
    const { id, userId } = dto;
    const review = await loadReview(id, userId);
    await review.destroy();
}

module.exports = deleteReview;