/**@type{Set<string>}*/
module.exports = new Set([
    "/api/users/sign-up",
    "/api/users/verification",
    "/api/users/verification/:token",
    "/api/auth/sign-in",
    "/api/auth/sign-out",
    "/api/auth/renew",
    "/api/categories/:categoryId",
    "/api/books/search",
    "/api/books/:bookId",
    "/api/reviews/books/:bookId"
]);