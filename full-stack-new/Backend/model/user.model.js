import mongoose from "mongoose";
import Book from './book.model.js';
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    wish : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book",
    }],
    books:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
        }
    ],
    role : ["Student","Author","Admin"]
});
const User = mongoose.model("User", userSchema);
export default User;