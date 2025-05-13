const router = require("express").Router();
const controller = require("./controller");
router.post("/", ...controller.createBooks);
router.get("/:bookId", ...controller.getBook);
module.exports = router;