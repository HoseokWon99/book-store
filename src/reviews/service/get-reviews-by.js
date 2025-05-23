//@ts-check
const { Review } = require("../model");
const { modelToDTO } = require("./internal");

/**
 * @typedef {Partial<{ bookId: bigint; userId: number; }>} GetReviewsDTO
 * @typedef {import("./internal").ReviewDTO} ReviewDTO
 */

/**
 *
 * @param {number} userId
 * @returns {function(Review): ReviewDTO}
 * @private
 */
const __mapper = userId => review => modelToDTO(review, userId);

/**
 *
 * @param {GetReviewsDTO} dto
 * @returns {Promise<ReviewDTO[]>}
 */
async function getReviewsBy(dto) {
   const { userId, ...rest } = dto;
   const where = Object.keys(rest).length ? rest : { userId };
   const reviews = await Review.findAll({ where });
   return reviews.map(__mapper(userId || 0));
}

module.exports = getReviewsBy;