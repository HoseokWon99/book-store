const router = require("express").Router();
const controller = require("./controller");

router.post("/", ...controller.createBooks);
router.get("/search", ...controller.searchBooks);
router.get("/:bookId", ...controller.getBook);
router.patch("/likes/:bookId", ...controller.updateLikes);

module.exports = router;

