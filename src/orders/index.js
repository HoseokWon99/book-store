const router = require("express").Router();
const controller = require("./controller");

router.post("/", ...controller.createOrder);
router.get("/", ...controller.getOrders);
router.get("/:orderId", ...controller.getOrderedBooks);

module.exports = router;