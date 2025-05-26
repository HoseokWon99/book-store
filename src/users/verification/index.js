const router = require("express").Router();
const controller = require("./controller");

router.post("/", ...controller.forgetPassword);
router.patch("/:token", ...controller.resetPassword);

module.exports = router;