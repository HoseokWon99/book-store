const { Review } = require("../model");
const { modelToDTO } = require("./internal");

/**
 * @typedef {{
 *     userId: number;
 *     bookId: bigint;
 *     content: string;
 * }} CreateReviewDTO
 *
 * @typedef {import("./internal").ReviewDTO} ReviewDTO
 */

/**
 *
 * @param {CreateReviewDTO} dto
 * @returns {Promise<ReviewDTO>}
 */
async function createReview(dto) {
    const review = await Review.create(dto);
    return modelToDTO(review, review.userId);
}

module.exports = createReview;