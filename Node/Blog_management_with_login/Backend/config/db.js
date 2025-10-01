const {default:mongoose}=require("mongoose")

require("dotenv").config()

const dbconnect=async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("Connect to MongoDB")
}

module.exports=dbconnect;