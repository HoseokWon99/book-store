const { modelToDTO, loadReview } = require("./internal");

/**
 *@typedef {{
 *     id: number;
 *     userId: number;
 *     content: string;
 *}} UpdateReviewDTO
 *
 * @typedef{import("./internal").ReviewDTO} ReviewDTO
 */

/**
 *
 * @param {UpdateReviewDTO}dto
 * @returns {Promise<ReviewDTO>}
 */
async function updateReview(dto) {
    const { id, userId, content } = dto;
    const review = await loadReview(id, userId);
    await review.update({ content });
    return modelToDTO(review, userId);
}

module.exports = updateReview;