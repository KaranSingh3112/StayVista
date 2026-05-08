const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedin, isOwner, validateListing } = require("../middlewares.js");

const listingController = require("../controllers/listings.js")
const multer = require("multer")
const upload = multer({dest: "uploads/"})

router.route("/")
    .get(wrapAsync(listingController.index))
    // .post(isLoggedin, validateListing, wrapAsync(listingController.newListing))
    .post(upload.single('listing[image]'),(req,res)=>{
        res.send(req.file)
    })


//New Listing Form
router.get("/new", isLoggedin, listingController.renderNewForm)

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin, isOwner, validateListing, wrapAsync(listingController.upadateListing))
    .delete(isLoggedin,isOwner, wrapAsync(listingController.deleteListing))



//Editing listing
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.updateForm))

module.exports = router;