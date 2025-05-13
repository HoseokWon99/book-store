/**
 * @typedef {
 *     function(
 *         import("express").Request,
 *         import("express").Response,
 *         import("express").NextFunction
 *     ) : *
 * } Handler
 *
 * @typedef {
 *     function(
 *         Error,
 *         import("express").Request,
 *         import("express").Response,
 *         import("express").NextFunction
 *     ) : *
 * } ErrorHandler
 *
 * @typedef { Array<Handler | ErrorHandler> } Pipeline
 */

