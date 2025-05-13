const router = require("express").Router();
const controller = require("./controller");
router.patch("/:bookId", ...controller.updateBookLike);
module.exports = router;