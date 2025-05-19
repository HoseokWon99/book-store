//@ts-check
const { Book, BookLike } = require("../model");
const sequelize = require("../../config/sequelize");

/**
 *
 * @typedef {{
 *     isbn: string;
 *     categoryId: number;
 *     title: string;
 *     author: string;
 *     price: number;
 *     pubOn: Date;
 * } & Partial<{
 *     pages: number;
 *     abstract: string;
 *     detail: string;
 * }>} CreateBookDTO
 *
 */

/**
 *
 * @param {CreateBookDTO[]}dtos
 * @returns {Promise<void>}
 */
async function createBooks(dtos) {
    for (const dto of dtos) {
        await sequelize.transaction(
            {autocommit: true},
            async transaction => {
                const book = await Book.create(dto, {transaction});

                await book.update({
                    coverImage: book.id.toString(),
                    defaultImages: Array.from({length: 4})
                        .map((_, idx) => (book.id + BigInt(idx + 1)).toString())
                        .toString()
                }, {transaction});

                await BookLike.create({bookId: book.id}, {transaction});
            }
        );
    }
}

module.exports = createBooks;