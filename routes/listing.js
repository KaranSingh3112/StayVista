const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middlewares.js");

const listingController = require("../controllers/listings.js")

//Index route
router.get("/", wrapAsync(listingController.index))

//New Listing
router.get("/new", isLoggedin, listingController.renderNewForm)
router.post("/", isLoggedin, validateListing, wrapAsync(listingController.newListing))

//show route
router.get("/:id", wrapAsync(listingController.showListing))

//Editing listing
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.updateForm))
router.put("/:id", isLoggedin, isOwner, validateListing, wrapAsync(listingController.upadateListing))

//Deleting listing
router.delete("/:id",isLoggedin,isOwner, wrapAsync(listingController.deleteListing))

module.exports = router;