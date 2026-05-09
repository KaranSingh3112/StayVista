const Listing = require("../models/listing")

//For home page view
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

//For new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}
module.exports.newListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}
    await newListing.save();
    req.flash("success","New listing added!!!");
    res.redirect("/listings");
}

//To show single listing
module.exports.showListing =async (req, res) => {
    let { id } = req.params;
    //Using nested populate
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {
        path: "author",
    }}).populate("owner");
    if(!listing){
        req.flash("error","Listing not found!!!");
        res.redirect("/listings")
    }else{
    res.render("listings/show.ejs", { listing })
    }
}

//For update listing
module.exports.updateForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you are trying to edit does not exist");
        res.redirect("/listings");
    }else{
    res.render("listings/edit.ejs", { listing });
    }
}
module.exports.upadateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash("success","Listing updated!!!");
    res.redirect(`/listings/${id}`);
}

//For delete listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!!!");
    res.redirect("/listings")
}