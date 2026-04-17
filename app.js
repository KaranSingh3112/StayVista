const express = require("express")
const app = express()
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

app.engine("ejs",ejsMate)

app.use(methodOverride("_method"))

app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));

main().then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StayVista')
}

app.get("/",(req,res)=>{
    res.send("Hello This is home page");
})

// app.get("/listingTest",async (req,res)=>{
//     let list1 = new Listing({
//         title: "My lovely place",
//         description: "I love this place, It's my favourite spot",
//         price: 1000,
//         location: "Mumbai",
//         country: "India"
//     })
//     await list1.save();
//     res.send("Done!!!");
// })

//Index route
app.get("/listings",async (req,res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
})

//New Listing
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
app.post("/listings",async (req,res) => {
    let newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings")
})

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
})

//Editing listing
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`);
})

//Deleting listing
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
    
})

app.listen("8080",()=>{
    console.log("App listens on port 8080");
})