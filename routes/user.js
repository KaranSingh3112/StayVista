const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user")
const passport = require("passport")

//Signup
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        await User.register(newUser, password)
        req.flash("success", "Welcome to StayVista!")
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}))

//Login
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    wrapAsync(async (req, res) => {
        req.flash("success","Welcome back to StayVista, Logged in successfully!");
        res.redirect("/listings");
    }))

module.exports = router;