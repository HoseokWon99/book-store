const router = require("express").Router();
const controller = require("./controller");

router.post("/", ...controller.addItems);
router.get("/", ...controller.getCart);
router.get("/:cartId", ...controller.getItems);
router.patch("/", ...controller.updateQuantity)
router.delete("/", ...controller.removeItems);

module.exports = router;