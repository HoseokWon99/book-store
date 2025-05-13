const router = require("express").Router();
const controller = require("./controller");
router.post("/sign-up", ...controller.signUp);
module.exports = router;
