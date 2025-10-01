const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    membershipType:{
        type:String,
        required:true,
    },
    joinDate:{
        type:Date,
        default:Date.now,
    }
});

const Member = mongoose.model("Member",memberSchema);
module.exports = Member;