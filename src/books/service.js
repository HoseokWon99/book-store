// @ts-check
const { Book } = require('./model');
const httpError = require("http-errors");
const booksLikesService = require("./likes/service");

/**
 * @typedef {{
 *     id: bigint;
 *     isbn: string;
 *     title: string;
 *     author: string;
 *     pubOn: Date;
 *     price: number;
 *     abstract: string | null;
 *     detail: string | null;
 *     categoryId: number;
 *     likes: number;
 *     likeIt?: boolean;
 * }} BookDTO
 *
 * @typedef {Omit<
 *  BookDTO, "id" | "likes" | "likeIt" | "images"
 * > & { nImages: number; imagesDirname?: string;
 * }} CreateBookDTO
 *
 * @typedef {{
 * success: boolean;
 * isbn: string;
 * title: string;
 * author: string;
 * }} CreateBookResult
 *
 * @typedef {
 *    (({ id: bigint; } & Partial<Omit<BookDTO, "id">>) |
 *     ({ isbn: string; } & Partial<Omit<BookDTO, "isbn">>)) & { userId?: number; }
 * } GetBookDTO
 *
 * @typedef{{
 * keyword?: string;
 * categories?: number[];
 * pubOn?: [Date, Date];
 * price?: [number, number];
 * likes?: [number, number];
 * sort?: { by: "pubOn" | "price" | "likes"; order: "ASC" | "DSC" }
 * }} SearchBooksDTO
 *
 * @typedef {
 * Omit<BookDTO, "isbn" | "pubOn" | "detail" | "likeIt">
 *} SearchBooksResult
 *
 * @typedef { { id: bigint; } & Partial<{
 *     abstract: string;
 *     detail: string;
 *     nImages: number;
 *     imagesDirname: string;
 * }>} UpdateBooKDTO
 */

/**
 *
 * @param {CreateBookDTO[]} data
 * @returns {Promise<CreateBookResult[]>}
 */
async function createBooks(data) {

    const results =  await Promise.allSettled(
        data.map(async dto => {
            const { isbn, ...rest } = dto;

            const [{ dataValues: { id } }, created]
                = await Book.findOrCreate({ where: { isbn }, defaults: rest });

            if (!created) throw httpError(408);
            await booksLikesService.createBookLike(id);
        })
    );

    return results.map((result, idx) => {
        const { isbn, title, author } = data[idx];

        return {
            success: result.status === 'fulfilled',
            isbn: isbn,
            title: title,
            author: author
        };
    });

}

/**
 *
 * @param {GetBookDTO} dto
 * @returns {Promise<BookDTO>}
 */
async function getBookBy(
    dto
) {
    const { userId, ...where } = dto;

    const { nImages, imagesDirname, ...data }
        = await Book.findOne({
            where: where,
            attributes: { exclude: ["createdAt", "updatedAt"] }
        }).then(book => {
            if (!book) throw httpError(404);
            return book.dataValues;
        });

    data.images = imagesDirname
        ? Array.from({ length: nImages })
            .map((_, idx) => `${imagesDirname}/${idx}.png`)
        : [];

    return Object.assign(data, await booksLikesService.getBookLike({
        bookId: dto.id,
        userId: userId,
    }));
}

/**
 *
 * @param dto
 * @returns {Promise<void>}
 */
async function updateBook(dto) {

}

module.exports = { createBooks, getBookBy }