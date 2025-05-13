const controller = require("./controller");
const router = require("express").Router();

router.post("/sign-in", ...controller.signIn);
router.get("/sign-out", ...controller.signOut);
router.get("/renew", ...controller.renew);

module.exports = router;