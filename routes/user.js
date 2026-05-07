const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

const userController = require("../controllers/users")

//Signup
router.get("/signup", userController.renderSignUpForm)
router.post("/signup", wrapAsync(userController.signUp))

//Login
router.get("/login", userController.renderLoginForm)
router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    wrapAsync(userController.login))

//For logout
router.get("/logout", userController.logout)

module.exports = router;