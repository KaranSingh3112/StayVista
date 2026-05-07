const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, validateReview, isReviewAuthor } = require("../middlewares.js");

const reviewController = require("../controllers/reviews.js")

//For adding review
router.post("/", isLoggedin,validateReview, wrapAsync(reviewController.addReview))

//Deleting review
router.delete("/:reviewId",isLoggedin, isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router