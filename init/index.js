const mongoose = require("mongoose")
const Listing = require("../models/listing.js")
const initData = require("./data.js")

main().then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StayVista')
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '69f9886b2070209968c67322'}))
    await Listing.insertMany(initData.data);
    console.log("Data inserted!!!");
}
initDB();