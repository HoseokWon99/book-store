const router = require("express").Router();
const controller = require("./controller");
router.get("/:categoryId", ...controller.getCategory);
module.exports = router;