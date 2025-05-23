const router = require("express").Router();
const controller = require("./controller");

router.route("/")
    .post(...controller.createReview)
    .get(...controller.getEditableReviews);

router.route("/:reviewId")
    .patch(...controller.updateReview)
    .delete(...controller.deleteReview);

router.get(":/bookId", ...controller.getReviews);

module.exports = router;