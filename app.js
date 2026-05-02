const express = require("express")
const app = express()
const mongoose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError")
const listings = require("./routes/listing")
const reviews = require("./routes/review");
const session = require("express-session")
const flash = require("connect-flash")

app.engine("ejs", ejsMate)
app.use(methodOverride("_method"))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

main().then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StayVista')
}

const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000 ,
        maxDate: 7*24*60*60*1000 ,
        httpOnly: true
    }
}
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)



app.get("/", (req, res) => {
    res.send("Hello This is home page");
})

//If no path matches
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!!!" } = err;
    res.status(statusCode).render("error.ejs", { message });
})

app.listen("8080", () => {
    console.log("App listens on port 8080");
})