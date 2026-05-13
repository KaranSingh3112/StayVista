const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middlewares.js");

const listingController = require("../controllers/listings.js")
const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedin, validateListing,upload.single('listing[image]'), wrapAsync(listingController.newListing))


//New Listing Form
router.get("/new", isLoggedin, listingController.renderNewForm)

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin, isOwner, validateListing, upload.single('listing[image]'), wrapAsync(listingController.upadateListing))
    .delete(isLoggedin,isOwner, wrapAsync(listingController.deleteListing))

//Editing listing
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.updateForm))

// app.get("/listings/:ca")

module.exports = router;