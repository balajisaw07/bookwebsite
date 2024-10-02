import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    desc:String,
    language:String,
    pages:Number,
    author:String,
    theme:String,
    isVerified : {
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;