const router = require("express").Router();
const controller = require("./controller");
router.get("/", ...controller.getCart);
router.patch("/", ...controller.updateCart);
router.delete("/", ...controller.removeProducts);
module.exports = router;