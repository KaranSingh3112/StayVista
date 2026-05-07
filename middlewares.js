const Listing = require("./models/listing")
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

//Middleware to check wheather user is logged in or not
module.exports.isLoggedin = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must do loggin first!");
        return res.redirect("/login");
    }
    next();
}

//Middleware to check which url has user tried for accessing before login
module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//Middleware to check wheather owner is trying to edit their listing or someone else
module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
        let listing = await Listing.findById(id);
        if(!res.locals.currUser._id.equals(listing.owner)){
            req.flash("error","You must be the owner to edit or delete property");
            return res.redirect(`/listings/${id}`)
        }
        next();
}

//Middleware to validate new listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//Validation for review
module.exports.validateReview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//Middleware to check wheather owner is trying to delete their Review or someone else
module.exports.isReviewAuthor = async (req,res,next) => {
    let { id,reviewId } = req.params;
        let review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error","You must be the owner to delete this review");
            return res.redirect(`/listings/${id}`)
        }
        next();
}