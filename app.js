const express = require("express")
const app = express()
const mongoose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError")
const listings = require("./routes/listing")
const reviews = require("./routes/review")

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
    let { statusCode = 500, message = "Spmething went wrong!!!" } = err;
    res.status(statusCode).render("error.ejs", { message });
})

app.listen("8080", () => {
    console.log("App listens on port 8080");
})