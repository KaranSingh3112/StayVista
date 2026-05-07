const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
}
module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        registeredUser = await User.register(newUser, password)
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to StayVista!")
            res.redirect("/listings");
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to StayVista, Logged in successfully😊");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    })
}