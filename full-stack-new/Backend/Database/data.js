import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const URI = process.env.MongoDBURI;

const dbConn = async() => {
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export default dbConn;