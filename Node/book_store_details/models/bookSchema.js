const mongoose = require("mongoose");
const { type } = require("os");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
        unique:true,
    },
    genre:{
        type:String,
        required:true,
    },
    ISBN:{
        type:String,
        unique:true,
    },
    publisher:{
        type:String,
        required:true,
    },
    publishedYear:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    isBorrowed:{
        type:Boolean,
        default:false,
    },
    borrowedBy:{
        type:String,
        default:"",
    },
    borrowedDate:{
        type:Date,
        default:Date.now,
    },
});

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;