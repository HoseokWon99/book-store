const router = require("express").Router();
const controller = require("./controller");

router.post("/", ...controller.addProducts);
router.get("/", ...controller.getCart);
router.get("/:cartId", ...controller.getProducts);
router.patch("/", ...controller.updateQuantity)
router.delete("/", ...controller.removeProducts);

module.exports = router;